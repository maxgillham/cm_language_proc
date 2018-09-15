import numpy as np
import csv
import json

def stringify(s):
    return "'"+s+"'"

def get_numpy(filename):
    reader = csv.reader(open(filename, "r"), delimiter=",")
    x = list(reader)
    npdata = np.array(x)[1:,:2]
    stringify_vectorized = np.vectorize(stringify)
    return stringify_vectorized(npdata)

def combine(data0,data1):
    #ignore duplicates
    ignore = np.isin(data0[:,0],data1[:,0])
    return np.append(data0[np.logical_not(ignore),:],data1,axis=0)

def generate_maturity_mapping(start=18,stop=100):
    return np.array([[i for i in range(start,stop+1)],[2000+i for i in range(start,stop+1)]]).T

def convert_to_json(data,filename,header0,header1):
    #PYTHON'S JSON DUMP LIBRARY SUCKS
    s = "{\n 'data': [\n"
    for i,row in enumerate(data):
        s += '  {\n'
        for j,element in enumerate(row):
            if j < len(row)-1:
                s += '   {}: {},\n'.format("'"+header0+"'",element)
            else:
                if i < len(data)-1:
                    s += '   {}: {}\n  }},\n'.format("'"+header1+"'",element)
                else:
                    s += '   {}: {}\n  }}\n'.format("'"+header1+"'",element)
    s += ' ]\n}'
    with open(filename,'w') as file:
        file.write(s)

if __name__ == '__main__':
    #csv files taken from https://www.nasdaq.com/screening/company-list.aspx
    npdata0 = get_numpy('companylist_0.csv')
    npdata1 = get_numpy('companylist_1.csv')
    npdata2 = get_numpy('companylist_2.csv')

    ticker_map = combine(npdata0,npdata1)
    ticker_map = combine(ticker_map,npdata2)
    ticker_map = ticker_map.tolist()
    convert_to_json(ticker_map,'ticker_map.json',header0='ticker',header1='name')

    maturity_map = generate_maturity_mapping(start=18,stop=100)
    maturity_map = maturity_map.tolist()
    convert_to_json(maturity_map,'maturity_map.json',header0='short',header1='long')
    
