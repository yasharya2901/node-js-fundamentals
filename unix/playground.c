#include<stdio.h>
#include<unistd.h>

int main(int argc, char *argv[]) {
    
    // for (int i = 0; i < argc; i++) {
    //     printf("argv number %d is %s\n", i, argv[i]);
    // }

    // printf("Process Id: %d\n", getpid());
    // printf("Parent Process Id: %d\n", getppid());


    fprintf(stdout, "Some text for stdout. (Coming from C)");
    fprintf(stderr, "Some text for stderr. (Coming from C)");

    char c = fgetc(stdin);

    while (c != EOF) {
        fprintf(stdout, "%c", c);
        fflush(stdout);
        c = fgetc(stdin);
    }
    return 0;
}