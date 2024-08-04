import mongodb from 'mongodb';

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}`;


class DBClient {
  constructor() {
    mongodb.MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
      if (!error) {
        this.db = client.db(database);
        this.usersCollection = this.db.collection('users');
        this.filesCollection = this.db.collection('files');
      } else {
        console.log(error.message);
	this.db = false;
      }
    });
  }

  isAlive() {
    return Boolean(this.db)
  }

  async nbUsers() {
    const numberofusers = this.usersCollection.countDocuments();
    return numberofusers;
  }

  async nbFiles() {
    const numberoffiles = this.filesCollection.countDocuments();
    return numberoffiles;
  }
}

const dbclient = new DBClient();

export default dbclient;

