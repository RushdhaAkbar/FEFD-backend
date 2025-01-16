import NotFoundError from "../domain/errors/not-found-error.js";
import Category from "../infrastructure/schema/Category.js";


/*const categories = [
    { _id: "ALL", name: "All" },
    { _id: "1", name: "Headphones" },
    { _id: "2", name: "Earbuds" },
    { _id: "3", name: "Speakers" },
    { _id: "4", name: "Mobile Phones" },
    { _id: "5", name: "Smart Watches" },
  ];
  */
  export const getCategories = async (req, res, next) => {
      try {
        const data = await Category.find();
        return res.status(200).json(data).send();
      } catch (error) {
        next(error);
      }
    };

  export const createCategory =async (req,res,next)=>{
    try {
        await Category.create(req.body);
        return res.status(201).send();
        
    } catch (error) {
        next(error);
    }
  }  

  export const getCategory =async(req,res,next) =>{
    try {
        const id = req.params.id;
        const category = await Category.findById(id);
        if(!category){
            throw new NotFoundError("Category Not Found");
        }
        return res.status(200).json(category).send();
    } catch (error) {
        next(error);
    }
  }

  export const deleteCategory = async(req,res,next)=>{
    try {
         const id = req.params.id;
         const category = await Category.findByIdAndDelete(id);

         if(category){
            throw new NotFoundError("Category Not Found");
         }
         return res.status(204).send();
    } catch (error) {
        next(error)
    }
  }

  export const updateCategory =async(req,res,next) =>{
    try{
        const id = req.params.id;
        const category = await Category.findByIdAndUpdate(id,req.body);
        if (category) {
            throw new NotFoundError("Category not found");
          }
        return res.status(200).json(category).send();
    } catch (error) {
        next(error);
    }
  }