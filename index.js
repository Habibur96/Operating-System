//1. Shortest Job First(SJF) Algorithm (SJF) 

#include < stdio.h >

    void main()
{
    int bt[20], p[20], wt[20], ft[20], i, j, n, total = 0, pos, temp;
    float avg_wt, avg_tat;
    printf("Enter number of process:");
    scanf("%d",& n);

    printf("\nEnter Burst Time:\n");
    for (i = 0; i < n; i++) {
        printf("p%d:", i + 1);
        scanf("%d",& bt[i]);
        p[i] = i + 1;
    }

    for (i = 0; i < n; i++) {
        pos = i;
        for (j = i + 1; j < n; j++) {
            if (bt[j] < bt[pos])
                pos = j;
        }

        temp = bt[i];
        bt[i] = bt[pos];
        bt[pos] = temp;

        temp = p[i];
        p[i] = p[pos];
        p[pos] = temp;
    }

    wt[0] = 0;
    for (i = 1; i < n; i++) {
        wt[i] = 0;
        for (j = 0; j < i; j++)
            wt[i] += bt[j];

        total += wt[i];
    }

    avg_wt = (float)total / n;
    total = 0;

    printf("\nProcess\t    Burst Time    \tWaiting Time\tFinishing Time");
    for (i = 0; i < n; i++) {
        ft[i] = bt[i] + wt[i];
        total += ft[i];
        printf("\np%d\t\t  %d\t\t    %d\t\t\t%d", p[i], bt[i], wt[i], ft[i]);
    }

    avg_tat = (float)total / n;
    printf("\n\nAverage Waiting Time=%f", avg_wt);
    printf("\nAverage Finishing Time=%f\n", avg_tat);
}

// 2. Priority Scheduling Algorithm

#include < stdio.h >

    int main()
{
    int bt[20], p[20], wt[20], tat[20], pr[20], i, j, n, total = 0, pos, temp, avg_wt, avg_tat;
    printf("Enter Total Number of Process:");
    scanf("%d",& n);

    printf("\nEnter Burst Time and Priority\n");
    for (i = 0; i < n; i++) {
        printf("\nP[%d]\n", i + 1);
        printf("Burst Time:");
        scanf("%d",& bt[i]);
        printf("Priority:");
        scanf("%d",& pr[i]);
        p[i] = i + 1;
    }


    for (i = 0; i < n; i++) {
        pos = i;
        for (j = i + 1; j < n; j++) {
            if (pr[j] < pr[pos])
                pos = j;
        }

        temp = pr[i];
        pr[i] = pr[pos];
        pr[pos] = temp;

        temp = bt[i];
        bt[i] = bt[pos];
        bt[pos] = temp;

        temp = p[i];
        p[i] = p[pos];
        p[pos] = temp;
    }

    wt[0] = 0;
    for (i = 1; i < n; i++) {
        wt[i] = 0;
        for (j = 0; j < i; j++)
            wt[i] += bt[j];

        total += wt[i];
    }

    avg_wt = total / n;
    total = 0;

    printf("\nProcess\t    Burst Time    \tWaiting Time\tTurnaround Time");
    for (i = 0; i < n; i++) {
        tat[i] = bt[i] + wt[i];
        total += tat[i];
        printf("\nP[%d]\t\t  %d\t\t    %d\t\t\t%d", p[i], bt[i], wt[i], tat[i]);
    }

    avg_tat = total / n;
    printf("\n\nAverage Waiting Time=%d", avg_wt);
    printf("\nAverage Turnaround Time=%d\n", avg_tat);

    return 0;
}

// Round Robin Algorithm

//Learnprogramo - programming made Simple
// C++ program for implementation of RR scheduling 
#include < iostream >
    using namespace std;
// Function to find the waiting time for all 
// processes 
void findWaitingTime(int processes[], int n,
    int bt[], int wt[], int quantum)
{
	// Make a copy of burst times bt[] to store remaining 
	// burst times. 
	int rem_bt[n];
    for (int i = 0; i < n ; i++)
    rem_bt[i] = bt[i]; 
	int t = 0; // Current time 
    // Keep traversing processes in round robin manner 
    // until all of them are not done. 
    while (1) { 
		bool done = true;
        // Traverse all processes one by one repeatedly 
        for (int i = 0; i < n; i++)
        {
            // If burst time of a process is greater than 0 
            // then only need to process further 
            if (rem_bt[i] > 0) {
                done = false; // There is a pending process 
                if (rem_bt[i] > quantum) {
                    // Increase the value of t i.e. shows 
                    // how much time a process has been processed 
                    t += quantum;
                    // Decrease the burst_time of current process 
                    // by quantum 
                    rem_bt[i] -= quantum;
                }
                // If burst time is smaller than or equal to 
                // quantum. Last cycle for this process 
                else {
                    // Increase the value of t i.e. shows 
                    // how much time a process has been processed 
                    t = t + rem_bt[i];
                    // Waiting time is current time minus time 
                    // used by this process 
                    wt[i] = t - bt[i];
                    // As the process gets fully executed 
                    // make its remaining burst time = 0 
                    rem_bt[i] = 0;
                }
            }
        }
        // If all processes are done 
        if (done == true)
            break;
    }
}
// Function to calculate turn around time 
void findTurnAroundTime(int processes[], int n,
    int bt[], int wt[], int tat[])
{
    // calculating turnaround time by adding 
    // bt[i] + wt[i] 
    for (int i = 0; i < n ; i++)
    tat[i] = bt[i] + wt[i];
}
// Function to calculate average time 
void findavgTime(int processes[], int n, int bt[],
    int quantum)
{ 
	int wt[n], tat[n], total_wt = 0, total_tat = 0;
    // Function to find waiting time of all processes 
    findWaitingTime(processes, n, bt, wt, quantum);
    // Function to find turn around time for all processes 
    findTurnAroundTime(processes, n, bt, wt, tat);
    // Display processes along with all details 
    cout << "Processes " << " Burst time "
        << " Waiting time " << " Turn around time\n";
    // Calculate total waiting time and total turn 
    // around time 
    for (int i = 0; i < n; i++)
    {
        total_wt = total_wt + wt[i];
        total_tat = total_tat + tat[i];
        cout << " " << i + 1 << "\t\t" << bt[i] << "\t "
            << wt[i] << "\t\t " << tat[i] << endl;
    }
    cout << "Average waiting time = "
        << (float)total_wt / (float)n;
    cout << "\nAverage turn around time = "
        << (float)total_tat / (float)n;
} 
int main()
{
	// process id's 
	int processes[] = { 1, 2, 3}; 
	int n = sizeof processes / sizeof processes[0];
	// Burst time of all processes 
	int burst_time[] = { 10, 5, 8};
	// Time quantum 
	int quantum = 2;
    findavgTime(processes, n, burst_time, quantum);
    return 0;
}

//  1. Write  program to simulate producer-consumer problem using
//  semaphores.


#include < stdio.h >
    int main()
{
  int buffer[10], bujsize, in, out, produce, consume,
        choice = 0; in=0;
    out = 0;
 int bufsize = 10;
    while (choice != 3) {
        printf("\n1. Produce \t 2. Consume \t3. Exit");
        printf("\nEnter your choice:");
        scanf("%d",& choice);

        switch (choice) {
            case 1: if ((in +1) % bufsize == out)
                printf("\nBuffer is Full");
            else {
                printf("Enter the value : ");
                scanf("%d",& produce);
                buffer[in] = produce;
           in = (in +1) % bufsize;

            }
                break;
            case 2: if (in== out)
                printf("\n Buffer is Empty");
            else {
                consume = buffer[out];
                printf("\nThe consumed value is %d", consume);
                out = (out + 1) % bufsize;
            }
                break;
        }
    }
}


