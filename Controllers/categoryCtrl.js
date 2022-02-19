const Category = require('../Models/categoryModel')
const Tanks = require('../Models/tanksModel')

const categoryCtrl = {
    getCategories: async(req, res) =>{
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCategory: async (req, res) =>{
        try {
            const {name} = req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg: "Ta kategoria isnieje."})

            const newCategory = new Category({name})

            await newCategory.save()
            res.json({msg: "Stworzono Kategorie"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async(req, res) =>{
        try {
            const tanks = await Tanks.findOne({category: req.params.id})
            if(tanks) return res.status(400).json({
                msg: "Usuń wszystkie kategorie"
            })

            await Category.findByIdAndDelete(req.params.id)
            res.json({msg: "Usuń Katogorie"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCategory: async(req, res) =>{
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Zaktualizuj kategorie"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = categoryCtrl