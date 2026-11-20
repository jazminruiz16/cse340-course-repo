import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showProjectsPage } from './controllers/projects.js';
import { showCategoriesPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';
import { showProjectDetailsPage } from './controllers/projects.js';
import { showCategoryDetailsPage } from './controllers/categories.js';
import { showNewOrganizationForm, processNewOrganizationForm } from './controllers/organizations.js';
import { showNewCategoryForm, processNewCategoryForm } from './controllers/categories.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);
// Route for project details page
router.get('/project/:id', showProjectDetailsPage);
// Route for category details page
router.get('/category/:id', showCategoryDetailsPage);

// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);
// Route for new category page
router.get('/new-category', showNewCategoryForm);

// Route to handle new organization form submission
router.post('/new-organization', processNewOrganizationForm);
// Route to handle new category form submission
router.post('/new-category', processNewCategoryForm);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;