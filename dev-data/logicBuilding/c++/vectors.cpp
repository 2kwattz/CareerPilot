// Online C++ compiler to run C++ program online
#include <iostream>
#include<array>
#include<vector>
using namespace std;

int main() {
    // Write C++ code here
    
    vector<int> v;
    
    cout<<"Size "<<v.capacity()<<endl;
    
    v.push_back(1);
        cout<<"Size "<<v.capacity()<<endl;
    v.push_back(2);
        cout<<"Size "<<v.capacity()<<endl;
    v.push_back(3);
        cout<<"Size "<<v.capacity()<<endl;
    v.push_back(3);
        cout<<"Size "<<v.capacity()<<endl;
        
    v.push_back(3);
        cout<<"Size "<<v.capacity()<<endl;
    
    
    
       
    

    return 0;
}