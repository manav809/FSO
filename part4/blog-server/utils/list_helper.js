const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.reduce(reducer, 0);
};

const highestLikes = (blogs) => {
  //4.5 and 4.7 are the same
  // First, get the max vote from the array of objects
  var maxVotes = Math.max(...blogs.map((e) => e.likes));
  // Get the object having votes as max votes
  var blog = blogs.find((blog) => blog.likes === maxVotes);
  delete blog._id;
  delete blog.url;
  delete blog.__v;
  console.log(blog);
  return blog;
};

const mostBlogs = (blogs) => {
  var maxBlogs = Math.max(...blogs.map((e) => e.blogs))
  var author = blogs.find((blog) => blog.blogs === maxBlogs)

  return {
    author: author.author,
    blogs: author.blogs
  }
}

module.exports = {
  dummy,
  totalLikes,
  highestLikes,
  mostBlogs
};
