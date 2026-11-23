import { body, validationResult } from 'express-validator';
// Import any needed model functions
import { getAllCategories, getCategoryDetails, createCategory, updateCategory} from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/projects.js';


// Define validation and sanitization rules for category form
// Define validation rules for category form
const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 150 characters')
    
];


// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryDetails(categoryId);
    const projectsByCategory = await getProjectsByCategoryId(categoryId);
    const title = 'Category Details';

    res.render('category', { title, categoryDetails, projectsByCategory });
};

//function to render the new category form

const showNewCategoryForm = async (req, res) => {
    const title = 'Add New Category';

    res.render('new-category', { title });
}
const processNewCategoryForm = async (req, res) => {
    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the new category form
        return res.redirect('/new-category');
    }

    const {name} = req.body;

    const categoryId = await createCategory(name);
    // Set a success flash message
    req.flash('success', 'Category added successfully!');
    res.redirect(`/category/${categoryId}`);
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryDetails(categoryId);

    const title = 'Edit Category';
    res.render('edit-category', { title, categoryDetails });
};

const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    // Check for validation errors
    const results = validationResult(req);
    if (!results.isEmpty()) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        // Redirect back to the edit category form
        return res.redirect('/edit-category/' + req.params.id);
    }
    const {name} = req.body;

    await updateCategory(categoryId, name);

    // Set a success flash message
    req.flash('success', 'Category updated successfully!');

    res.redirect(`/category/${categoryId}`);
};
// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage, showNewCategoryForm, processNewCategoryForm, categoryValidation, showEditCategoryForm, processEditCategoryForm };