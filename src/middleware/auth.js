//--------------------------------importing modules---------------------------------------------------

const blogsModel = require("../model/blogsModel");
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");


//---------------------------------Authentication-------------------------------------------------------

const authentication = function (req, res, next) {
  try {

    let token = req.headers["x-api-key"];
    if (!token) return res.status(404).send({ status: false, msg: "token must be present" });

    let decodedToken = jwt.verify(token, "Project-1 Blogging-group-6");

    if (!decodedToken)
      return res.status(401).send({ status: false, msg: "Invalid Token" })

    next();


  } catch (error) {
    console.log(error)
    return res.status(500).send({ status: false, Error: error.message })
  }
}

//------------------------------------Authorisation---------------------------------------------------

const authorisation = async function (req, res, next) {
  try {

    const Id = req.params.blogId
    const token = req.headers["x-api-key"];
    //find in blog data

    if (!Id) return res.status(400).send({ msg: "Please provide blogId" })
    if (!isValidObjectId(Id)) return res.status(400).send("blogId is Invalid")

    const decodedToken = jwt.verify(token, "Project-1 Blogging-group-6");
    const blog = await blogsModel.findById(Id)
    if (!blog) return res.status(404).send({ msg: false, status: "" })
    let authId = blog.authorId
    let tokenid = decodedToken.userId
    if (tokenid != authId) return res.status(403).send({ status: false, msg: "you are not authorised" })

    next()


  } catch (error) {
    console.log(error)
    return res.status(500).send({ status: false, Error: error.message })
  }
}


//-----------------------------authorisation for delete blogs by query delete/blogs---------------------

const authorisation1 = async function (req, res, next) {
  try {

    const data = req.query
    const token = req.headers["x-api-key"];

    if (!Object.keys(data).length) {
      return res.status(400).send({ status: false, msg: "please provide some data to delete" })
    }
    if (Object.keys(data).some(a => a == "authorId")) {
      if (!data.authorId) {
        return res.status(400).send({ status: false, msg: "Author id must be present" })

      }

      if (!validObjectId(data.authorId)) {
        return res.status(400).send({ status: false, msg: "plese enter the correct length of author id" })

      }
    }

    data.isDeleted = false
    const decodedToken = jwt.verify(token, "Project-1 Blogging-group-6");
    const blog = await blogsModel.find(data).select({ _id: 1, authorId: 1 })


    if (blog.length == 0) return res.status(404).send({ status: false, msg: "no data avilable" })


  
    const authorId = blog.filter(b => b["authorId"] == decodedToken.userId)

    if (authorId.length == 0) return res.status(403).send({ status: false, msg: "you are not authorised" })
    const blogId = blog.map(I => I["_id"])

    req.validBlogId = blogId
    next()


  } catch (error) {
    console.log(error)
    return res.status(500).send({ status: false, Error: error.message })
  }
}

// exporting all the middlewares here

module.exports = { authentication, authorisation, authorisation1 };



