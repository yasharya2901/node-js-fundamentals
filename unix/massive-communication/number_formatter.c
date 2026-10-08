#include<stdio.h>
#include<stdlib.h>
#include<string.h>

char* formatNumber(char* input, char begin, char divider) {
    int length = strlen(input);

    int formattedLength = length + length / 3 + 2;
    char* formattedNumber = (char*)malloc(formattedLength);
    int j = 0;
    int commaCount = length % 3;

    formattedNumber[0] = begin;
    j = j + 1;
    for (int i = 0; i < length; i++) {
        formattedNumber[j] = input[i];
        j = j + 1;

        if (commaCount > 0 && i < length - 1 && (i + 1) % 3 == commaCount) {
            formattedNumber[j++] = divider;
        } else if (commaCount == 0 && i < length - 1 && (i + 1) % 3 == 0) {
            formattedNumber[j++] = divider;
        }
    }
    formattedNumber[j] = '\0';
    return formattedNumber;
}

int main(int argc, char* argv[]) {

    
    FILE *outputFile = fopen(argv[1], "w");
    char *number = (char *) malloc(10 * sizeof(char));
    int index = 0;

    int c = fgetc(stdin);

    // Keep reading until get the EOF using Ctrl + D
    while (c != EOF) {
        if (c != ' ') {
            number[index] = c;
            ++index;
        }

        if (c == ' ') {
            if (index > 0) {
                number[index] = '\0';

                // Format the number we just read
                char* formattedNumber = formatNumber(number, argv[2][0], argv[3][0]);
                // Write to our destination stream
                fprintf(outputFile, " %s ", formattedNumber);
                // fflush(outputFile);

                // Resetting...
                free(number);
                free(formattedNumber);

                number = (char *) malloc(10 * sizeof(char));
                index = 0;
            }
        }

        // Read another character from stdin
        c = fgetc(stdin);
    }

    fclose(outputFile);

    return 0;
}