class ApiFeatures {   //JavaScript class named ApiFeatures that encapsulates various methods for performing filtering, searching, and pagination on a MongoDB query.
    constructor(query,queryStr) {  //The constructor method initializes an instance of the ApiFeatures class with two properties: query and queryStr.
        this.query = query;  //Represents the MongoDB query object.
        this.queryStr = queryStr;  //Represents the query string received from the client, typically containing parameters for searching, filtering, and pagination.
    }
    search() {
        //If a keyword is provided, it constructs a MongoDB query using the $regex operator, which allows for regular expression pattern matching. 
        //In this case, it searches for documents where the "name" field matches the provided keyword. The $options: "i" 
        //makes the search case-insensitive, so it matches both uppercase and lowercase letters.
        const keyword = this.queryStr.keyword
          ? {
              name: {
                $regex: this.queryStr.keyword,
                $options: "i",
              },
            }
          : {};
    
        this.query = this.query.find({ ...keyword });
        //This line applies the constructed keyword query to the existing this.query object using the find() method.
        //The spread operator (...) is used to spread the properties of the keyword object into a new object. 
        //This is done to avoid modifying the original keyword object or the this.query object directly.
        return this;
      }
    filter() {
        const queryCopy = {...this.queryStr};  
        //This line creates a shallow copy of the queryStr object received from the client. 
        //It ensures that modifications made to queryCopy do not affect the original queryStr object.
        const removeFields = ["keyword","page","limit"];
        //This section removes certain fields from the queryCopy object that are not used for filtering. 
        //Fields such as "keyword", "page", and "limit" are typically used for search and pagination and are not relevant for filtering.
        removeFields.forEach((key)=>delete queryCopy[key]);

        //filter for price and rating
        let queryStr = JSON.stringify(queryCopy);  //It first converts the queryCopy object into a JSON string using JSON.stringify().
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));  //This line modifies the existing this.query object to apply the filtered query criteria.
        //It parses the modified JSON string (queryStr) back into a JavaScript object using JSON.parse() and passes it as the argument to the find() method of the MongoDB query.
        return this; //This line returns the current instance of the ApiFeatures class (this) after applying the filtering.
    }
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage-1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
module.exports=ApiFeatures;