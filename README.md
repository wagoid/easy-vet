# easy-vet

## How to run the code

### Server:

1. Download Visual Studio 2015 with .NET Framework 4.5.
2. Install the dependencies on Tools > NuGet Package Manager > Manage NuGet Packages For Solution
3. Change the Web.config connection string to suit with your local SQLServer instance.
4. Go to Tools > NuGet Package Manager > Package Manager Console
5. Run the command `Update-Database` to generate the tables and seed the database with some starting data

### Client:

1. Open your shell and go to the 'static-files-server' folder.
2. Run `npm install`
3. Run `node index.js`
4. Now go to the client folder.
5. Run `npm install`
6. Run `grunt browserify`
7. Now open localhost with the port you specified in process.env.PORT (default is 8080)
