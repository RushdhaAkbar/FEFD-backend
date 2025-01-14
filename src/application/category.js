import NotFoundError from "../domain/errors/not-found-error.js";

const categories = [
    { _id: "ALL", name: "All" },
    { _id: "1", name: "Headphones" },
    { _id: "2", name: "Earbuds" },
    { _id: "3", name: "Speakers" },
    { _id: "4", name: "Mobile Phones" },
    { _id: "5", name: "Smart Watches" },
  ];
  export const getCategories = (req, res, next) => {
      try {
        return res.status(200).json(categories).send();
      } catch (error) {
        next(error);
      }
    };

  export const createCategory =(req,res,next)=>{
    try {
        categories.push(req.body);
        return res.status(201).send();
        
    } catch (error) {
        next(error);
    }
  }  

  export const getCategory =(req,res,next) =>{
    try {
        const id = req.params.id;
        const category = categories.find((cat) => cat._id == id);
        if(!category){
            throw new NotFoundError("Category Not Found");
        }
        return res.status(200).json(category).send();
    } catch (error) {
        next(error);
    }
  }

  export const deleteCategory = (req,res,next)=>{
    try {
         const id = req.params.id;
         const index = categories.findIndex((cat)=>cat._id=id);

         if(index === -1){
            throw new NotFoundError("Category Not Found");
         }
         categories.splice(index,1);
         return res.status(204).send();
    } catch (error) {
        next(error)
    }
  }

  export const updateCategory =(req,res,next) =>{
    try{
        const id = req.params.id;
        const index= categories.findIndex((cat)=>cat._id==id);
        if (index === -1) {
            throw new NotFoundError("Category not found");
          }
        
          const existingCategory = categories[index];
          const updatedCategory = {...existingCategory,...req.body};
          categories[index] = updatedCategory;

          return res.status(200).json(updatedCategory).send();
    } catch (error) {
        next(error);
    }
  }