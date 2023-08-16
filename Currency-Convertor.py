import requests

app_id = "bf69802c79904002ba1d2b435771995f"
base_url = f"https://openexchangerates.org/api/latest.json?app_id={app_id}"

def convert(fromCurrency, toCurrency, amount):
    try:
        response = requests.get(base_url)
        data = response.json()
        rates = data['rates']
        fromRate = rates[fromCurrency]
        toRate = rates[toCurrency]
        convertedAmount = amount * (toRate / fromRate)
        return convertedAmount
    
    except requests.exceptions.RequestException as e:
        print("An error occurred:", e)
        return None
    
def list():
    try:
        response = requests.get(base_url)
        data = response.json()
        return data.values()
    
    except requests.exceptions.RequestException as e:
        print("An error occurred:", e)
        return None

print("Welcome to Currency Convertor\n")
option = 'M'

while (option != 'E'): 
    if (option == 'M'):
        print("\nHere are your options:")
        print("M = Menu for options")
        print("C = Convert between currencies")
        print("L = List of currencies and rates")
        print("E = Exit the program")
    
    elif (option == 'C'):
        currencyA = input("\nEnter your starting currency: ")
        currencyB = input("Enter your ending currency: ")
        amount = float(input("Enter the exchange amount: "))
        
        print("\n" + str(amount) + " " + currencyA + " converts to " + str(format(convert(currencyA, currencyB, amount), '.2f')) + " " + currencyB)

    elif (option == "L"):
        print(list())

    else:
        print("Invalid option")

    option = input("\nPlease select an option: ").upper()

print("\nThank you for using Currency Convertor!")