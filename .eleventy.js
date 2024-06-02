module.exports = function(eleventyConfig) {
  eleventyConfig.addCollection("ordinaryLife", function (collectionAPI) {
    return collectionAPI.getFilteredByGlob("./src/ordinary-life/*.md");
  });

  eleventyConfig.addCollection("helveticaStandard", function (collectionAPI) {
    return collectionAPI.getFilteredByGlob("./src/helvetica-standard/*.md");
  });

  eleventyConfig.addCollection("opera", function (collectionAPI) {
    return collectionAPI.getFilteredByGlob("./src/opera/*.md");
  });

  eleventyConfig.addCollection("correspondence", function (collectionAPI) {
    return collectionAPI.getFilteredByGlob("./src/opera/*.md");
  });


  eleventyConfig.addPassthroughCopy("src/styles.css");
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
