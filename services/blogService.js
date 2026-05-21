const Blog = require('../models/Blog');

exports.createBlog = async (authorId, data) => Blog.create({ author: authorId, ...data });

exports.getAllBlogs = async () => Blog.find({ isPublished: true }).populate('author', 'name').sort('-createdAt');

exports.getBlogById = async (id) => Blog.findById(id).populate('author', 'name');

exports.updateBlog = async (id, data) => Blog.findByIdAndUpdate(id, data, { new: true });

exports.deleteBlog = async (id) => Blog.findByIdAndDelete(id);







