const blogService = require('../services/blogService');

exports.create = async (req, res, next) => {
  try {
    const blog = await blogService.createBlog(req.user.id, req.body);
    res.status(201).json({ success: true, data: blog });
  } catch (err) { next(err); }
};

exports.getAll = async (req, res, next) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.status(200).json({ success: true, data: blogs });
  } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.status(200).json({ success: true, data: blog });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const blog = await blogService.updateBlog(req.params.id, req.body);
    res.status(200).json({ success: true, data: blog });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await blogService.deleteBlog(req.params.id);
    res.status(200).json({ success: true, message: 'Blog deleted' });
  } catch (err) { next(err); }
};
