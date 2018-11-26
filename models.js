const Sequelize = require('sequelize')

const sequelize = new Sequelize('<dbName>', '<userName>', '<password>', {
	dialect: 'mysql',
	define: {
		freezeTableName: true,
		timestamps: false,
		host: 'localhost'
	}
})

const Author = sequelize.define('author', {
  author_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
  author_name: {
	  type: Sequelize.STRING,
	  unique: true
  }
})

const Book = sequelize.define('book', {
  bkid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
  title: {
		type: Sequelize.STRING,
		unique: true
		},
   language: Sequelize.STRING,
   subject : Sequelize.JSON,
   pub_date: Sequelize.DATE,
   pub_name: Sequelize.STRING,
   license: Sequelize.STRING
})

Book.belongsTo(Author,{foreignKey: 'author_id'});

module.exports = {
  Book,
  Author
}

sequelize.sync().then(() => {
    console.log(`Database & tables created!`)
	sequelize.close();
})