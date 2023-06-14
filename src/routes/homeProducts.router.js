import express from 'express';
import { ProductModel } from '../DAO/models/products.model.js';

export const productsHtml = express.Router();

productsHtml.get('/', async (req, res) => {
  try {
    const { limit, page, category, sort } = req.query;
    const queryCategory = category ? { category: category } : {};

    let querySort = {};
    if (sort == 'asc') {
      querySort = { price: 1 };
    } else if (sort == 'desc') {
      querySort = { price: -1 };
    } else {
      querySort = {};
    }

    const queryResult = await ProductModel.paginate(queryCategory, { limit: limit || 10, page: page || 1, sort: querySort });
    const { docs, ...rest } = queryResult;

    let products = docs.map((doc) => {
      return {
        title: doc.title,
        description: doc.description,
        price: doc.price,
        thumbnail: doc.thumbnail,
        code: doc.code,
        stock: doc.stock,
        category: doc.category,
      };
    });

    let links = [];
    for (let i = 1; i < rest.totalPages + 1; i++) {
      links.push({ label: i, href: 'http://localhost:8080/products?page=' + i });
    }

    return res.status(200).render('home', { products, pagination: rest, links });
  } catch (error) {
    console.log(error);
  }
});