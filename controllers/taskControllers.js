const fs = require("fs");
const path = require("path");
const Task = require("../models/blogSchema");
const uniqid = require("uniqid");
const AppError = require("../helpers/appErrorClass");
const sendErrorMessgae = require("../helpers/sendError");
const sendResponse = require("../helpers/sendResponse");
const multer = require("multer");
const { Query } = require("mongoose");
const { query } = require("express");

const createBlog = (req, res, next) => {
  if (req.body == null) {
    res.send("error");
  }
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  let upload = multer({ storage: storage }).single("imageUrl");
  upload(req, res, (err) => {
    if (err) {
      sendErrorMessgae(
        new AppError(400, "Unsucessful", "Couldnt multer Image"),
        req,
        res
      );
    }
    if (req.file) {
      req.body.imageUrl = req.file.path;
    }

    new Task(req.body)
      .save()
      .then((data) => {
        sendResponse(200, "Sucessfull", "Blog Is Created", req, res);
      })
      .catch((err) => {
        sendErrorMessgae(
          new AppError(
            400,
            "Unsucessful",
            "Add valid key in formData -(blogHeader,BlogContent,imageUrl,relatedLinks)"
          ),
          req,
          res
        );
      });
  });
};

const findUniqueBlog = (req, res, next) => {
  Task.find(req.params).then((data) => {
    if (data.length == 0) {
      sendErrorMessgae(
        new AppError(400, "Unsucessful", "Blog is in valid"),
        req,
        res
      );
    }

    sendResponse(200, "Sucessful", data, req, res);
  });
};
const findBlog = (req, res, next) => {
  Task.find().then((data) => {
    sendResponse(200, "Sucessful", data, req, res);
  });
};

const updateUniqueBlog = (req, res, next) => {
  Task.updateOne(req.params, req.body).then((data) => {
    if (data.nModified == false) {
      sendErrorMessgae(
        new AppError(404, "There is no such Blog -Enter proper keys"),
        req,
        res
      );
    }
    sendResponse(200, "Sucessful", data, req, res);
  });
};
const updateImageById = (req, res) => {
  let blog = Task.findOne(req.params)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      sendErrorMessgae(new AppError(404, "There is no such Blog"), req, res);
    });

  if (blog == null) {
    sendErrorMessgae(new AppError(404, "There is no such Blog"), req, res);
  }

  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  let upload = multer({ storage: storage }).single("imageUrl");
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      sendErrorMessgae(
        new AppError(400, "There something went wrong--Put key as imageUrl"),
        req,
        res
      );
    } else {
      Task.updateOne(req.params, { imageUrl: req.file.path })
        .then((data) => {
          if (data.nModified == false) {
            sendErrorMessgae(new AppError(404, "Blog Not Updated"), req, res);
          }
          res.send("Blog Updated");
        })
        .catch((err) => {
          sendErrorMessgae(
            new AppError(404, "There is no such Blog"),
            req,
            res
          );
        });
    }
  });
};
const deleteBlog = (req, res, next) => {
  Task.deleteOne(req.params).then((data) => {
    if (data.n == false) {
      sendErrorMessgae(new AppError(404, "There is no such Blog"), req, res);
    }
    res.send("Deleted");
  });
};

module.exports.createBlog = createBlog;
module.exports.findBlog = findBlog;
module.exports.findUniqueBlog = findUniqueBlog;
module.exports.updateUniqueBlog = updateUniqueBlog;
module.exports.deleteBlog = deleteBlog;
module.exports.updateImageById = updateImageById;
