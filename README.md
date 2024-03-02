> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details
This project essentially handles the front-end for the server we made in the previous sprint. After logging in, the user is able to load, view, and search a CSV file. The user can either view just the functions output, or they can view the command and the output via the brief / verbose radio buttons. This project "mocks" the servers functionality, by housing small example CSVs in the mockedJson class and then mocking responses from the server based on user inputs to the command input box. 

# Design Choices
There are a few design choices worth discussing. Firstly, we put each of our REPL Functions in their own tsx files, and then created a map between the command name and the function itself. This makes it easy for a developer to add their own REPL Function, as all they would have to do is create a new file to house their function and then add their function and command name to the map housed in the CommandExecutor class. The CommandExecutor class houses this map and handles the actual execution of the command upon recieving the command name and any associated arguments through the command input box. 
Something else we did was create a mockedJson class. This class houses the mockedCSV data, and contains the functions that actually output the mocked responses. This makes it easy to call these functions from outside the class while still giving the functions easy access to the necessary CSV data. This mockedJson class also houses a map between the filepath and the actual CSV stored in instance variables for easy access upon recieving the file path from the command input. One more thing worth noting is that we altered the REPLFunction's interface definition to return an object of our own interface, Printable. This allows for extensibility as the developer can define a Printable however they want as long as it conforms to the interface, and they can write their own REPLFunctions that return different types of printable objects. 

# Errors/Bugs
There are no errors or bugs that we are aware of. 

# Tests
The tests rely on the playwright testing framework. They test all functionalites of the project including search, view, load, as well as login and sign out functionalities. In order to run the tests
simple cd into the mock directory and run "npx playwright test" in the terminal. These tests follow the format of navigating to the url, interacting with the page in some capacity, and then asserting some that some aspect works as expected based on the interaction. 

# How to
In order to run the program, cd into the mock directory and then type "npm start" in the terminal. This will provide a link to a locally hosted server, which displays the interface for this project. Once on the web page, you first must click the login button to start running commands. Once you have logged in, you can enter command in the command box specified, and press submit to run the command. The output of running this command will then be displayed. In order to see the command and the output, you can switch to "verbose" mode with the radio buttons at the bottom. The program automatically starts in "brief" and you can switch back and forth. If you press the sign out button, the program will return to the login screen. Right now, the program is equipped with three commands, load_file, view, and search. The load_file command should be run in the form load_file [filepath], view is run with no arguments and this will allow you to view the loaded csv, and search is run with search [column] [value] where column is the column to search and value is the value to search for. search and view must be run after load_file has been run. To run the tests, as explained above just run "npx playwright test" from the mock directory. 

# Collaboration
*(state all of your sources of collaboration past your project partner. Please refer to the course's collaboration policy for any further questions.)*
