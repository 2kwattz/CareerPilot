// Online C++ compiler to run C++ program online
#include <iostream>
#include<stdio.h>
using namespace std;

int main() {
    // Write C++ code here
    
    int a = 10;
    int *p;
    cout << "Let's see Pointers\n";
    
    p = &a;
    
    cout<<"Value of p is "<<p;
    printf("Value of p in c is %d ",p);
    
    cout<<" Refference of &a is "<<&a<<endl;
    
    cout<<" Pointer of p "<<*p;
    

    return 0;
}