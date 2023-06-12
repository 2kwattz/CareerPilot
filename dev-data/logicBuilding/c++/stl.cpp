// Online C++ compiler to run C++ program online
#include <iostream>
#include<array>

int main() {
    // Write C++ code here

    int basicArray[10] = {1,2,3};
    
    std::array<int, 4> a = {1,2,3,4};
    
    int size = a.size();
    
    for(int i=0;i<size;i++){
        cout<<a[i]<<endl;
    }
    
    cout<<"Empty or not "<<a.empty()<<endl;
    cout<<"First element of the array"<<a.front()<<endl;
    cout<<"Last element of the array"<<a.back()<<endl;
    
    cout<<"Array at 2nd element is "<<a.at(2)<<endl;
    

    return 0;
}