class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const exclutedFields = ['page', 'sort', 'limit', 'fields'];
    exclutedFields.forEach((el) => {
      delete queryObj[el];
    });
    // 2) Advance Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // 3) Sorting
  sort() {
    if (this.queryString.sort) {
      const sortby = req.query.sort.split(',').join(' ');
      console.log(sortby, 'sort by quries');

      this.query = this.query.sort(sortby);
      console.log(this.query, 'sort by quries');
      //sort('price')
    }
    // else {
    //   console.log('from else');
    //   query = await query.sort('ratingAverage');
    // }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      // const fields = req.query.fields.split(',').join(' ');
      this.query = this.query.select(req.this.query.fields);
      console.log(this.query.fields);
    }
    // else {
    //   query = await query.select('-__v');
    // }
    return this;
  }

  paginate() {
    // 4) Pagination
    // page=2&limit=10 (1-10, ,page 1,)( 10-20 ,page 2, )

    // console.log(req.query);
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
