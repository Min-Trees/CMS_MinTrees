#print("toi khong yeu lap trinh, nhung toi phai lam lap trinh vien")
# n = 10
# m = 13.2
# v = "i love you"
# f = False

# n = input("nhap n: ")
# print(n)

# if dieu kien:
#     code block

# elif dieu kien:
#     code block

# else:
#     code block


# n = int(input("Nhap n: "))
# n_re = 0
# while n > 0:
#     temp = n % 10
#     n = n // 10
#     n_re = n_re * 10 + temp
# print(n_re)

# bai ... 
# nhap n sau do nhap n so nguyen 
# kiem tra n so nguyen va in ra neu la so nguyen to 
# input : 5 - > 1 2 3 4 5
# output : 2 3 5


# n = int(input("nhap so luong n: "))
# list_num = []
# for i in range (n):
#     temp = int(input("nhap phan tu: "))
#     list_num.append(temp)

# for i in list_num:
#     flag = True
#     if i < 2:
#         flag = False
#     else:
#         for j in range(2,int(i**0.5)+1):
#             if i % j == 0:
#                 flag = False
#     if flag:
#         print(i, end = " ")
    

# n = int(input("nhap n: "))
# flag = True
# for i in range(2,int(n ** 0.5)+1):
#     if n % i == 0:
#         flag = False
# if flag == True:
#     print("snt")
# else:
#     print("ko phai snt")


# n = int(input("nhap n: "))
# fn2 = 0
# fn1 = 1
# #fn = fn2 + fn1
# fn = 0
# print(fn2 ,fn1 , end = " ")
# for i in range(2,n):
#     fn = fn2 + fn1
#     fn2 = fn1 
#     fn1 = fn
#     print(fn, end =" ")


# fn2 = 0, fn1 = 1 
# fn = fn2 + fn 1 
# 0 1 1
# fn2 = 1 , fn1 =1
#fn = fn2 + fn1 =2
# 0 1 1 2
# fn2 = 1, fn1 = 2
# fn = 3

# n = int(input("nhap so n: "))
# sum = 0
# for i in range(1,n):
#     if n % i == 0:
#         sum += i
# if n == sum:
#     print("Hoan Hao")
# else:
#     print("Khong Hoan Hao")


n = int(input())

# for i in range(n):
#     temp = int(input("nhap phan tu")) # nhap list 1
#     list1.append(temp)
# for i in range(n):
#     temp = int(input("nhap phan tu")) # nhap list 2
#     list2.append(temp)

m1 = input()
m2 = input()
list1 = m1.split()
list2 = m2.split()
print(list1)
print(list2)
sum_col = 0
for i in range(n):
    sum = int(list1[i]) + int(list2[i])
    print(sum, end = " ")

