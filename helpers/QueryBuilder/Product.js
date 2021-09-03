const table = 'products'
const Product = {
    getAll : (field = '*', lim = 10, offset = 1) =>{
        return `SELECT ${field} FROM ${table} LIMIT ${lim} OFFSETT ${offset}`;
    },
    getByNameOrId : (key = '', field = '*', lim = 10) =>{
        return `SELECT ${field} FROM ${table} WHERE name LIKE '%${key}%' OR id LIKE '%${key}%'`;
    },
    getById : (id, field='*')=>{
        return `SELECT ${field} FROM ${table} WHERE id = ${id}`;
    },
    insert : (value)=>{
        const {id, name, stock, description, price, categories, images, weight, condition, brand, author, rating, seller} = value
        return `INSERT INTO ${table} (id, name, stock, description, price, categories, images, weight, condition, brand, author, rating, seller) VALUES (${id}, '${name}', '${stock}', '${description}', '${price}', '${categories}', '${images}', '${weight}', '${condition}', '${brand}', '${author}', '${rating}', '${seller}')`
    },
    update : (value)=>{
        const {id, name, stock, description, price, categories, images, weight, condition, brand, author, rating, seller} = value
        return `UPDATE ${table} SET name = '${name}', stock = '${stock}', description = '${description}' WHERE id = ${id}`
    },
    deleteProduct : (key ={}) =>{
        return `DELETE FROM ${table} WHERE ${Object.keys(key)} = '${Object.values(key)}'`;
    }
}

module.exports = Product