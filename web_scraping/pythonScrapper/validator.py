# Hashtags Validator
import keyboard
import datetime


# f = open("myfile.txt", "x")
hashtagCollection = []


def hashtagsValidator():

    while True:
        print("Enter Hashtags")
        hashtagInput = input("Enter a hashtag: ")

        if hashtagInput in hashtagCollection:
            print("Already Present")
        else:
            hashtagCollection.append(hashtagInput)
            print(hashtagCollection)
            print("To Stop Entering, Press Ctrl + C")
            dt = datetime.datetime.now().strftime("%Y_%m_%H")
            f = open(f"hashtagsList-{dt}.txt", "a")
            f.write(hashtagInput + "\n")
            f.close()


hashtagsValidator()
