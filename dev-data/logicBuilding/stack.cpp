// Online C++ compiler to run C++ program online
#include <iostream>
#include <stack>
using namespace std;

int main() {
    
    stack<string> s;
    s.push("Roshan");
    s.push("Yash");
    s.push("Pratik");
    s.push("Vraj");
    s.push("Anmol");
    
    cout<<" Top element of the stack => "<<s.top()<<endl;
    
    s.pop(); 
    
    cout<<s.top()<<endl;
    
    cout<<" Size of the new array is "<<s.size()<<endl;
    
   

    return 0;
}