
//--------------------importing modules-------------------------------------
const { isValidObjectId } = require("mongoose");
const authorModel = require("../model/authorModel");
const blogsModel = require("../model/blogsModel");
const { typeValid, isNotEmpty, keysLength, validBoolean, isValid } = require('../Validation/validator');


//------------------------ creation of blogs post/blogs----------------------
const createBlog = async function (req, res) {
    try {
        let blog = req.body;
        let { title, body, category, subcategory, tag, isPublished, authorId } = blog
        if (!keysLength(blog)) return res.status(400).send({ status: false, msg: "blog details required" });

        // Title validation
        if (!title) return res.status(400).send({ status: false, msg: "title is required" });
        if (!isValid(title.trim())) return res.status(400).send({ msg: "Title is not valid" });

        // validation of body
        if (!body) return res.status(400).send({ status: false, msg: "body is required" });
        if (!isValid(body.trim())) return res.status(400).send({ status: false, msg: "content of the body is invalid" });

        //validation of authorId 
        if (!authorId) return res.status(400).send({ status: false, msg: "authorId is required" });

        if (!isValidObjectId(authorId)) return res.status(400).send({ msg: "authorId is not valid" })

        //validation of category//
        if (!category) return res.status(400).send({ status: false, msg: "category is required" });
        if (!isValid(category.trim())) return res.status(400).send({ status: false, msg: "category is not valid" });


        if (Object.keys(blog).some(t => t == "tag")) {

            if (!typeValid(tag)) return res.status(400).send({ status: false, msg: "Incorrect type of tags" });
            if (tag.length == 0) return res.status(400).send({ status: false, msg: "tag array is empty" });

            for (let i = 0; i < tag.length; i++) {
                if (typeof tag[i] !== "string") return res.status(400).send({ msg: "Plese enter tags in string format" })
                if (!isNotEmpty(tag[i])) return res.status(400).send({ msg: "tag is empty" });
            }
            blog.tag = tag.map(a => a.trim())

        }


        if (Object.keys(blog).some(t => t == "subcategory")) {

            if (!typeValid(subcategory)) return res.status(400).send({ status: false, msg: "Incorrect type of subcategory" });
            if (subcategory.length == 0) return res.status(400).send({ status: false, msg: "subcategory is empty" });

            for (let i = 0; i < subcategory.length; i++) {
                if (typeof subcategory[i] !== "string") return res.status(400).send({ msg: "Plese enter subcategory in string format" })
                if (!isNotEmpty(subcategory[i])) return res.status(400).send({ msg: "subcategory value is empty" });
            }
            blog.subcategory = subcategory.map(a => a.trim())
        }


        if (Object.keys(blog).some(t => t == "isPublished")) {
            if (!validBoolean(isPublished)) return res.status(400).send({ msg: "Plese enter only true or false" })
            if (isPublished === true) blog.publishedAt = new Date()
        }


        //find authorId in athorModel

        let authId = await authorModel.findOne({ _id: authorId });

        // check given authId is present in the author document or not
        if (!authId) return res.status(404).send({ status: false, msg: "author not found" })

        const blogCreated = await blogsModel.create(blog);
        return res.status(201).send({ status: true, data: blogCreated });

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}

//-------------------------------- get blogs by get/blogs-------------------------------
const filteredBlogs = async function (req, res) {
    try {
        let filters = req.query;
        filters.isDeleted = false
        filters.isPublished = true


        if (Object.keys(filters).some(a => a == "authorId")) {

            if (!filters.authorId) return res.status(400).send("provide authorid")
            if (!isValidObjectId(filters.authorId)) return res.status(400).send({ msg: "authorId is not valid" });
        }


        const getBlogs = await blogsModel.find(filters)

        if (getBlogs.length == 0) return res.status(404).send({ status: false, msg: "No data found" })
        return res.status(200).send({ status: true, data: getBlogs })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }


}


//------------------------- update the blogs put/blogs/:blogId--------------------------------

const updateBlogs = async function (req, res) {
    try {
        const blogId = req.params.blogId;
        let blogData = req.body;
        let { title, body, category, subcategory, tag, isPublished, publishedAt } = blogData

        if (!keysLength(blogData)) return res.status(404).send({ status: false, msg: "Body is required" });

        if (Object.keys(blogData).some(a => a == "title")) {
            if (!title) return res.status(400).send({ status: false, msg: "title is required" });
            if (!isValid(title.trim())) return res.status(400).send({ msg: "Title is not valid" });

        }


        if (Object.keys(blogData).some(a => a == "category")) {
            if (!category) return res.status(400).send({ status: false, msg: "category is required" });
            if (!isValid(category.trim())) return res.status(400).send({ status: false, msg: "category is not valid" });

        }

        if (!isValidObjectId(blogId)) return res.status(400).send({ msg: "blogId is invalid" })

        if (Object.keys(blogData).some(a => a == "body")) {
            if (!body) return res.status(400).send({ status: false, msg: "plese provid some data in body" })
            if (!isValid(body.trim())) return res.status(400).send({ status: false, msg: "plese provid data in string" })

        }

        if (Object.keys(blogData).some(t => t == "tag")) {

            if (!typeValid(blogData.tag)) return res.status(400).send({ status: false, msg: "Incorrect type of tags" });
            if (tag.length == 0) return res.status(400).send({ status: false, msg: "tag empty" });

            for (let i = 0; i < tag.length; i++) {
                if (typeof tag[i] !== "string") return res.status(400).send({ msg: "Plese enter tags in string format" })
                if (!isNotEmpty(tag[i])) return res.status(400).send({ msg: "tag is empty" });
            }
            blog.tag = tag.map(a => a.trim())
        }


        if (Object.keys(blogData).some(t => t == "subcategory")) {

            if (!typeValid(subcategory)) return res.status(400).send({ status: false, msg: "Incorrect type of subcategory" });
            if (subcategory.length == 0) return res.status(400).send({ status: false, msg: "subcategory is empty" });

            for (let i = 0; i < subcategory.length; i++) {
                if (typeof subcategory[i] !== "string") return res.status(400).send({ msg: "Plese enter subcategory in string format" })
                if (!isNotEmpty(subcategory[i])) return res.status(400).send({ msg: "subcategory is empty" });
            }
            blog.subcategory = subcategory.map(a => a.trim())
        }

        if (Object.keys(blogData).some(t => t == "isPublished")) {
            if (!validBoolean(isPublished)) return res.status(400).send({ msg: "Plese enter only true or false" })
            if (isPublished === true) publishedAt = new Date()
        }


        let blog = await blogsModel.findOneAndUpdate({ _id: blogId, isDeleted: false },
            {
                $set: { isPublished: isPublished, body: body, title: title, publishedAt: publishedAt, category: category },
                $push: { tag: tag, subcategory: subcategory }
            },
            { new: true });

        if (!blog) return res.status(404).send({ status: false, msg: "blog is not found" })

        return res.status(200).send({ status: true, data: blog });

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, Error: error.message })
    }

}



//------------------- delete blogs using blogId delete/blogs/:blogId--------------------------------
const deleteBlogsById = async function (req, res) {
    try {
        let blogId = req.params.blogId;

        let findBlog = await blogsModel.findById(blogId)
        if (findBlog.isDeleted == true) return res.status(404).send({ status: false, msg: "Blog is alredy deleted" })

        let Blog = await blogsModel.findByIdAndUpdate({ blogId: blogId }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true });
        if (!Blog) {
            return res.status(404).send({ status: false, msg: "Blog not found" });

        }
        return res.status(200).send()
    } catch (err) {
        return res.status(400).send({ status: false, msg: err.message })
    }

}

// --------------- delete blogs by query delete/blogs----------------------------------------

const deleteBlogByQuery = async function (req, res) {
    try {
        const filters = req.query;

        if (Object.keys(filters).length == 0) {
            return res.status(400).send({ msg: "No documnet is deleted, Please give atlest one filter", status: false })
        }
        let blogfilters = { isDeleted: false, isPublished: false }
        if (filters["authorId"]) {
            if (!isValidObjectId(filters["authorId"])) {

                return res.status(400).send({ msg: "authorId is is invalid", status: false })
            }
            blogfilters["authorId"] = filters["authorId"]
        } else {
            let decodedToken = req.decodedToken
            // console.log(decodedToken);
            let userId1 = decodedToken.userId
            blogfilters["authorId"] = userId1
        }
        if (filters["category"]) {
            blogfilters["category"] = filters["category"]
        }

        if (filters["tag"]) {
            blogfilters["tag"] = filters["tag"]
        }
        if (filters["subcategory"]) {
            blogfilters["subcategory"] = filters["subcategory"]
        }

        let data = await blogsModel.updateMany(blogfilters, { isDeleted: true, deletedAt: Date.now() },)

        if (data.modifiedCount == 0) {
            return res.status(404).send({ status: false, msg: "No document found" })
        }

        res.status(200).send({ status: true, msg: data });
    }
    catch (error) {

        res.status(500).send({ status: false, msg: error.message });
    }

}



// exporting all the functions here

module.exports = { createBlog, updateBlogs, deleteBlogByQuery, deleteBlogsById, filteredBlogs }
