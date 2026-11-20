// Import any needed model functions
import { getAllCategories, getCategoryDetails, createCategory } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/projects.js';
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
    const {name} = req.body;

    const categoryId = await createCategory(name);
    // Set a success flash message
    req.flash('success', 'Category added successfully!');
    res.redirect(`/category/${categoryId}`);
};

// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage, showNewCategoryForm, processNewCategoryForm };