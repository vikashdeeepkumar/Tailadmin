import pool from '../config/db.js';

export async function findAll({ page, limit, search }) {
  const offset = (page - 1) * limit;
  const searchTerm = `%${search}%`;
    const whereClause = `WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR country LIKE ?  OR phone LIKE ?`;

  // SQL query for fetching paginated and searchable users
  const [rows] = await pool.query(
    `SELECT * FROM next_users  ${whereClause} ORDER BY id DESC LIMIT ? OFFSET ?`,
    [searchTerm, searchTerm, searchTerm, searchTerm,searchTerm, parseInt(limit), offset]
  );
  
  // SQL query for fetching the total count of users
  const [totalResult] = await pool.query(
    'SELECT COUNT(*) as count FROM next_users WHERE first_name LIKE ?',
    [searchTerm]
  );
  
  const totalUsers = totalResult[0].count;
  const totalPages = Math.ceil(totalUsers / limit);

  return { data: rows, totalUsers, totalPages };
}


export async function create({first_name,last_name,email,password,avatar='owner.jpg'}) {
  const [result] = await pool.query(
    'INSERT INTO next_users (first_name, last_name, email,password,avatar) VALUES (?, ?, ?,?,?)',
    [first_name, last_name, email,password,avatar]
  );
  console.log(result.insertId)
  return result.insertId;
}


//get user by email
export async function findByEmail (email){
  const [rows] = await pool.query('SELECT * FROM next_users WHERE email = ?', [email]);
  return rows[0]; 
};


//get user by id

export async function findById (id){
  const [rows] = await pool.query('SELECT * FROM next_users WHERE id = ?', [id]);
  return rows[0]; 
};


//add new user
export async function insertUser(userData) {
  const allowedFields = [
    'first_name', 'last_name', 'email', 'password', 'phone', 'bio', 
    'facebook_profile', 'linkedin_profile', 'x_com_profile', 
    'instagram_profile', 'country', 'city_state', 'postal_code', 'tax_id', 'avatar','role'
  ];
  
  // Filter only allowed fields
  const fieldsToInsert = {};
  allowedFields.forEach(field => {
    if (userData[field] !== undefined) {
      fieldsToInsert[field] = userData[field];
    }
  });

  if (Object.keys(fieldsToInsert).length === 0) {
    throw new Error('No valid fields to insert');
  }

  const keys = Object.keys(fieldsToInsert);
  const values = Object.values(fieldsToInsert);
  const placeholders = Array(keys.length).fill('?').join(', ');

  const [result] = await pool.query(
    `INSERT INTO next_users (${keys.join(', ')}) VALUES (${placeholders})`,
    values
  );
  
  return result.insertId;
}


//update user
export async function updateById(id, updateData) {
    console.log(id);
      console.log(updateData);
  const allowedFields = [
    'first_name', 'last_name','email', 'phone', 'bio', 
    'facebook_profile', 'linkedin_profile', 'x_com_profile', 
    'instagram_profile', 'country', 'city_state', 'postal_code', 'tax_id','avatar','role'
  ];
  
  // Filter only allowed fields
  const fieldsToUpdate = {};
  allowedFields.forEach(field => {
    if (updateData[field] !== undefined) {
      fieldsToUpdate[field] = updateData[field];
    }
  });

  console.log(fieldsToUpdate);
  
  if (Object.keys(fieldsToUpdate).length === 0) {
    throw new Error('No valid fields to update');
  }
  
  const setClause = Object.keys(fieldsToUpdate)
    .map(field => `${field} = ?`)
    .join(', ');
  
  const values = Object.values(fieldsToUpdate);
  values.push(id);
  
  const [result] = await pool.query(
    `UPDATE next_users SET ${setClause} WHERE id = ?`,
    values
  );
  
  return result.affectedRows > 0;
}