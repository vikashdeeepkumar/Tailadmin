import pool from '../config/db.js';

//add new user
export async function insertClass(userData) {
  const allowedFields = [
    'class_name', 'noofstudents', 'class_description','updated_by'
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
    `INSERT INTO next_classmanagement (${keys.join(', ')}) VALUES (${placeholders})`,
    values
  );
  
  return result.insertId;
}


export async function insertFiles(classId, fileNames) {
  if (!fileNames || fileNames.length === 0) {
    return;
  }

  // Map file names to an array of arrays, with each inner array being [classId, fileName]
  const values = fileNames.map(fileName => [classId, fileName]);
  
  // Use a transaction to ensure all file inserts are successful
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const [result] = await connection.query(
      `INSERT INTO next_classmanagement_files (class_id, file_name) VALUES ?`,
      [values]
    );
    await connection.commit();
    return result;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}



export async function findAll({ page, limit, search,userEmail }) {
  const offset = (page - 1) * limit;
  const searchTerm = `%${search}%`;

  let whereClause = `WHERE (nc.class_name LIKE ? OR nc.noofstudents LIKE ? OR u.email LIKE ?)`;
  let queryParams = [searchTerm, searchTerm, searchTerm];
  
  // Add filter for specific user if userEmail is provided
  if (userEmail) {
    whereClause += ` AND u.email = ?`;
    queryParams.push(userEmail);
  }

  const baseQuery = `
    SELECT nc.*, COUNT(f.id) AS files_count, u.email AS updated_by_email 
    FROM next_classmanagement nc 
    LEFT JOIN next_classmanagement_files f ON nc.id = f.class_id  
    LEFT JOIN next_users u ON nc.updated_by = u.id 
    ${whereClause} 
    GROUP BY nc.id 
    ORDER BY nc.id DESC 
    LIMIT ? OFFSET ?
  `;

  // Add limit and offset to query parameters
  queryParams.push(parseInt(limit), offset);

  // Execute the query
  const [rows] = await pool.query(baseQuery, queryParams);
  // SQL query for fetching the total count of users
  
   let countQuery = `
    SELECT COUNT(DISTINCT nc.id) as count 
    FROM next_classmanagement nc 
    LEFT JOIN next_users u ON nc.updated_by = u.id 
    WHERE (nc.class_name LIKE ? OR nc.noofstudents LIKE ? OR u.email LIKE ?)
  `;
  
  let countParams = [searchTerm, searchTerm, searchTerm];
  
  if (userEmail) {
    countQuery += ` AND u.email = ?`;
    countParams.push(userEmail);
  }

  const [totalResult] = await pool.query(countQuery, countParams);
  const totalClasses = totalResult[0].count;
  const totalPages = Math.ceil(totalClasses / limit);

  return { data: rows, totalClasses, totalPages };
}