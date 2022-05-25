from bottle import redirect, route, run, error, template, request, static_file, redirect
import psycopg2
from psycopg2 import Error
from random import choice
import json

userLoggedIn = False
signup = False
username = ""
checkUserData = False
errorReg = False
errorLogin = False

@route("/", method="POST")
def signup():

    global signup
    global userLoggedIn
    global username
    global checkUserData 
    global errorReg 


    try:
        username = getattr(request.forms, "username")
        firstName = getattr(request.forms, "firstName")
        lastName = getattr(request.forms, "lastName")
        password = getattr(request.forms, "password")
        country = getattr(request.forms, "country")
        
        #Databas, hämta alla användarnann 
        conn = psycopg2.connect(database="am0986",
                                    user='am0986',
                                    password='j6uv3f3d',
                                    host='pgserver.mau.se',
                                    port='5432')

        conn.autocommit = True
        cursor = conn.cursor()
        
        cursor.execute('''SELECT username FROM user_info''')
        usernamesDatabase= cursor.fetchall()

        conn.commit()
        cursor.close()
        conn.close()

        for index, tuple in enumerate(usernamesDatabase):
            
            element_one= tuple[0]
            
            print (element_one)
            
            if (element_one == username):
                errorReg= False 
                checkUserData = False

            
            elif len(username) < 4 or len(username) > 16: 
                    print ("Felaktigt ifyllt användarnamn")
                    errorReg=True 
                    checkUserData = False

            elif len(password) <8: 
                    print ("Fel längd på lösen!")
                    errorReg=True
                    checkUserData = False
            else: 

                checkUserData = True 
                conn = psycopg2.connect(database="am0986",
                                            user='am0986',
                                            password='j6uv3f3d',
                                            host='pgserver.mau.se',
                                            port='5432')

                conn.autocommit = True
                cursor = conn.cursor()



                cursor.execute(f'''INSERT INTO user_info(username, f_name, l_name, p_word, country)
                VALUES ('{username}', '{firstName}', '{lastName}', '{password}', '{country}')''')

                conn.commit()
                print(f"\n{username}, {firstName}, {lastName}, {country} registrerad")
                
            break       

    except (Exception, Error) as error:
        print("\nRegistrering misslyckades")
        print("-"*30)
        print(error)
        print("-"*30)
        checkUserData = False 
        errorReg= False 

                    
    finally:
        if checkUserData == True: 
            (conn)
            cursor.close()
            conn.close()
            userLoggedIn = True
            signup = True
            return template("index", userLoggedIn=userLoggedIn, signup=signup, username=username, checkUserData=checkUserData)
            
        else: 
            return template("ErrorReg", userLoggedIn=userLoggedIn, signup=signup, username=username, checkUserData=checkUserData, errorReg=errorReg)

@route("/login/", method="POST")
def log_in():
    global username
    global errorLogin
    global userLoggedIn
    
    try:
        logInName = getattr(request.forms, "logInName")
        password2 = getattr(request.forms, "password2")
        username = logInName

        conn = psycopg2.connect(database = "am0986",
                                user = 'am0986',
                                password = 'j6uv3f3d',
                                host = 'pgserver.mau.se',
                                port = '5432')

        cursor = conn.cursor()
        cursor.execute('''SELECT username, p_word FROM user_info''')
        listUser= cursor.fetchall()

        conn.commit()
        cursor.close()
        conn.close()

        print (listUser)
    
        for index, tuple in enumerate(listUser):
            element_one= tuple[0]
            element_two =tuple[1]

            print (element_one, element_two)
            
            if (element_one == username and element_two == password2):
                print("\nrätt namn!")
                userLoggedIn= True
            
    except (Exception, Error) as error:
        print("Inloggning misslyckades")
        print("-"*30)
        print(error)
        print("-"*30)

    finally:
        if userLoggedIn == True:
            (conn)
            cursor.close()
            conn.close()
        
            return template("index", userLoggedIn=userLoggedIn, username=logInName)
        else: 
            print("Inlogg fel")
            return template("errorLogin", errorLogin=errorLogin, userLoggedIn=userLoggedIn, userName=logInName)

@route("/")
def user_logged_in():

    global userLoggedIn

    if userLoggedIn == True:
        return template("index", userLoggedIn=True, signup=signup, username=username)
    else:
        return template("index", userLoggedIn=False, signup=signup, username=username)

@route("/racepage/<text>/")
def race(text):

    if text == "beginner":
        myFile= open("articles/beginner.json", "r")
        textToRace = myFile.read()
        TTR = json.loads(textToRace)
        myFile.close()

    elif text == "novice":
        myFile = open("articles/novice.json", "r")
        textToRace = myFile.read()
        TTR = json.loads(textToRace)
        myFile.close()

    elif text == "master":
        myFile = open("articles/master.json", "r")
        textToRace = myFile.read()
        TTR = json.loads(textToRace)
        myFile.close()

    else:    
        myFile = open(f"articles/{text}.json", "r")
        textToRace = myFile.read()
        TTR = json.loads(textToRace)
        myFile.close() 

    return template("racepage", textFile=TTR, userLoggedIn=userLoggedIn)

@route("/logout/")
def logout_html():

    global userLoggedIn
    userLoggedIn = False

    redirect("/")

@route("/profile/")
def user_profile():

    global username
    userLoggedIn = True 

    return template("profile", userLoggedIn=userLoggedIn, username=username)

@route("/racetext/save/", method="POST")
def save_racetext ():

    raceText = str(request.forms.get("userRaceText"))

    myFile=open("articles/usertext.json", "w")
    myFile.write(json.dumps(raceText))
    myFile.close()

    redirect("/racepage/usertext/")

@route("/result/", method="POST", userLoggedIn=userLoggedIn)
def race_text_to_list():
    '''gör om texten till en lista och beräknar användarens resultat i accuracy%'''


    return template("result", userLoggedIn=userLoggedIn)


@route("/static/<filename>/")
def static_files(filename):

    return static_file(filename, root="static")

@route("/faq/")
def faq (): 
    return template("faq", userLoggedIn=userLoggedIn, userName=username)

@route("/about/")
def about (): 
    return template("about",  userLoggedIn=userLoggedIn, userName=username)

@error(404)
def error404(error):
    """
    #Hanterar: Error 404 filen hittades inte.
    """

    return template("error", userLoggedIn=userLoggedIn, errorLogin=errorLogin)

@route("/static/<filename>")
def static_files(filename):

    return static_file(filename, root="static")


run(host="127.0.0.1", port=8080, reloader=True, debug=True)
