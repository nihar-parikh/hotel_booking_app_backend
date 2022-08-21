class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    let searchQuery = {};
    const {
      name,
      category,
      city,
      address,
      title,
      description,
      ratings,
      distance,
      cheapestPrice,
      featured,
    } = this.queryString;
    if (name) {
      searchQuery.name = {
        $regex: name,
        $options: "i", //i means case insensitive
      };
    }
    if (city) {
      searchQuery.city = {
        $regex: city,
        $options: "i", //i means case insensitive
      };
    }
    if (address) {
      searchQuery.address = {
        $regex: address,
        $options: "i", //i means case insensitive
      };
    }
    if (title) {
      searchQuery.title = {
        $regex: title,
        $options: "i", //i means case insensitive
      };
    }
    if (description) {
      searchQuery.description = {
        $regex: description,
        $options: "i",
      };
    }
    if (category) {
      searchQuery.category = {
        $regex: category,
        $options: "i",
      };
    }
    // if (priceGte) {
    //   searchQuery.price = {
    //     // $regex: price,
    //     // $options: "i",
    //     $gte: priceGte,
    //   };
    // }
    // if (priceLte) {
    //   searchQuery.price = {
    //     // $regex: price,
    //     // $options: "i",
    //     $lte: priceLte,
    //   };
    // }
    // if (priceGte && priceLte) {
    //   searchQuery.price = {
    //     // $regex: price,
    //     // $options: "i",
    //     $gte: priceGte,
    //     $lte: priceLte,
    //   };
    // }

    if (ratings) {
      searchQuery.ratings = {
        // $regex: price,
        // $options: "i",
        $gte: Number(ratings), //need to convert string into number
      };
    }
    if (distance) {
      searchQuery.distance = {
        // $regex: price,
        // $options: "i",
        $gte: Number(distance), //need to convert string into number
      };
    }
    if (cheapestPrice) {
      searchQuery.cheapestPrice = {
        // $regex: price,
        // $options: "i",
        $gte: Number(cheapestPrice), //need to convert string into number
      };
    }

    this.query = this.query.find(searchQuery);
    return this;
  }

  // filter() {
  //   const queryCopy = { ...this.queryStr };
  //   //   Removing some fields for category
  //   const removeFields = ["keyword", "page", "limit"];

  //   removeFields.forEach((key) => delete queryCopy[key]);

  //   // Filter For Price and Rating

  //   let queryStr = JSON.stringify(queryCopy);
  //   queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

  //   this.query = this.query.find(JSON.parse(queryStr));

  //   return this;
  // }

  pagination(hotelsPerPage) {
    const currentPage = Number(this.queryString.page) || 1; //we need to convert string into number and if there is no page query then by default take it as 1

    const skip = hotelsPerPage * (currentPage - 1);
    this.query = this.query.limit(hotelsPerPage).skip(skip);
    return this;
  }
}

export default ApiFeatures;
