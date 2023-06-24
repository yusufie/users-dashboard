import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI as any;

const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials): Promise<any> => {
        try {
          if (!credentials) {
            throw new Error('Invalid credentials');
          }

          // Connect to the MongoDB database
          const client = new MongoClient(MONGODB_URI);
          await client.connect();

          // Access the "usersdata" collection
          const db = client.db('usersdata');
          const usersCollection = db.collection('users');

          // Find the user based on the provided email
          const user = await usersCollection.findOne({ email: credentials.email });

          // Close the database connection
          client.close();

          // Check if the user exists and the password is correct
          if (user && user.password === credentials.password) {
            // Return the user object if authentication is successful
            return Promise.resolve(user);
          } else {
            // If authentication fails, throw an error or return null
            return Promise.reject(new Error('Invalid email or password'));
          }
        } catch (error) {
          // Handle any errors that occur during authentication
          return Promise.reject(new Error('Authentication failed'));
        }
      },
    }),
  ],
  database: `${MONGODB_URI}usersdata`,
};

const authHandler = (req: any, res: any) => NextAuth(req, res, options);

export default authHandler;
