from bottle import redirect, route, run, error, template, request, static_file, redirect
import psycopg2
from psycopg2 import Error
from random import choice
import json

userLoggedIn = False
signup = False
username = ""
checkUserData = False
errorReg=False
errorlogin=False

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


        for name in usernamesDatabase:
            if(name != username):
                
            
                if len(username) < 4 or len(username) > 16: 
                    print ("Felaktigt ifyllt användarnamn")
                    errorReg=True 
                    

                elif len(password) <8: 
                    print ("Fel längd på lösen!")
                    errorReg=True 
                


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

            else: 
                checkUserData = False 
            break       

    except (Exception, Error) as error:
        print("\nRegistrering misslyckades")
        print("-"*30)
        print(error)
        print("-"*30)
        checkUserData = False 
                    
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
        


@route("/login", method="POST")
def log_in():
    global username
    global errorlogin
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
        
            return template("index", userLoggedIn=userLoggedIn, userName=logInName)
        else: 
            print("Inlogg fel")
            return template("errorlogin", errorlogin=errorlogin, userLoggedIn=userLoggedIn, userName=logInName)

@route("/")
def user_logged_in():

    global userLoggedIn

    if userLoggedIn == True:
        return template("index", userLoggedIn=True, signup=signup, username=username)
    else:
        return template("index", userLoggedIn=False, signup=signup, username=username)




@route("/racepage/<text>")
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

    redirect("/racepage/usertext")


@route("/result/", method="POST", userLoggedIn=userLoggedIn)
def race_text_to_list():
    '''gör om texten till en lista och beräknar användarens resultat i accuracy%'''

    raceText = getattr(request.forms, "raceText")
    userInput = getattr(request.forms, "userRaceInput")
    raceTextAsList = raceText.split(" ")
    userInputAsList = userInput.split(" ")

    lastWord = raceTextAsList[-1]
    lastInput = userInputAsList[-1]


    matches = sum(a == b for a, b in zip(raceTextAsList, userInputAsList))
    lenRaceText=len(raceTextAsList)
    result = int(matches / lenRaceText * 100)

    print("antal rätt", matches)
    print("textens längd", lenRaceText)
    print("procent", result)

    
    print(lastWord, lastInput)

    return template("result", userResult=result, userMatches=matches, textLength=lenRaceText, userLoggedIn=userLoggedIn)


@route("/static/<filename>")
def static_files(filename):

    return static_file(filename, root="static")

@error()
def error(error):
    """
    Hanterar: Error 404 filen hittades inte.
    """

    return template("error")

@route("/faq")
def faq (): 
    return template("faq", userLoggedIn=userLoggedIn, userName=userName)

@route("/about")
def about (): 
    return template("about",  userLoggedIn=userLoggedIn, userName=userName)

@route("/static/<filename>")
def static_files(filename):

    return static_file(filename, root="static")


run(host="127.0.0.1", port=8080, reloader=True, debug=True)
