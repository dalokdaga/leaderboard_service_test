class PaginationInfo {
    constructor(totalItems, limit, offset) {
      this.totalItems = totalItems;
      this.limit = limit;
      this.offset = offset;
    }
  
    get totalPages() {
      return Math.ceil(this.totalItems / this.limit);
    }
  
    get currentPage() {
      return Math.floor(this.offset / this.limit) + 1;
    }
  
    asObject() {
      return {
        totalItems: this.totalItems,
        totalPages: this.totalPages,
        currentPage: this.currentPage,
        itemsPerPage: this.limit
      };
    }
}
  
module.exports = PaginationInfo;
  