export default (extensions = () => {
  Number.prototype.between = function(a, b) {
    return this.valueOf() < Math.max(a, b) && this.valueOf() > Math.min(a, b);
  };
});
