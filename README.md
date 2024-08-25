# todo

This is an app to manage my time and attention in the ways that work best for me.
If these things sound nice to you, you're welcome to give it a try as well.

We combine several things:

- A "task stack" system based on Mark Forster's Final Version Perfected
- Work timers inspired by Pomodoros
- Automated follow-ups

And hopefully end up with a task management system that gets out of my way.

Here's how it might look to use this system:

- You load the app at the beginning of your day.
  You are trying to figure out your plan for the day, so you go to the task selection screen.
- The task selection screen automatically adds the oldest available task, then guides you through building up a stack.
- Once you've built a stack, you start a timer on the work at the top of the stack, visualize the outcome, and then start working.
- When you complete your task, the system asks if you need any follow-ups or if the work needs to be re-entered or broken down.
  You answer questions as appropriate, keeping your task database relevant with very little effort.
- You keep working in this manner until you complete the amount of work you want or the day is over.
  The system keeps track of how many quality sessions you completed and displays them as a motivation.
- You step away from your desk, satisfied with the progress you made.

## The "Task Stack" Algorithm

This is an algorithm based on [Mark Forster's Final Version Perfected](http://markforster.squarespace.com/blog/2021/11/16/the-final-version-perfected-fvp-instructions-reposted.html) algorithm.
You can do this in your head, but the system will enforce a few helpful boundaries around it.
Here's how you do it:

1. Task the oldest task on your list.
   This is the base of your "stack."
2. For each newer task, ask yourself "do I want to do this more than the previous thing?"[^questions]
   If the answer is "yes", add that task to the list.
3. Once you reach the end of your active tasks, start doing the tasks in the opposite order you added them.
4. When you're done working on a task, remove it from the stack.
   If you finished the task: good job, cross it off.
   If you're not done, re-enter it at the "new" side of the list.
5. After finishing or re-entering a task, you're allowed to go back to step 2 to add more tasks to your stack.
   (I don't like to do this often, though, since it means that psychically weighty tasks accumulate at the end of the list.)

[^questions]: You can also ask yourself other questions like "is there anything I've been resisting doing more than this?" or add constraints based on your location or energy like "all my tasks have to see progress in 10 minutes or less." Have fun with it.

In step 4, this system will automatically ask you some questions:

## The Follow-Ups

The original Final Version algorithm was designed for a flat task list.
This is fine, but I want to be able to break down work into component parts, as well as track progress on larger projects.
Both of these things can get really annoying to manage, and most of the time I've spent on managing my todo list over the years has come down to making sure everything is tracked properly.
In general, I've found that consistently doing a little bit of "gardening" saves a lot of that effort, especially since I've got a better idea of what the next step is immediately after finishing a task.

This system tries to help with that!
When you finish a work session, the system will schedule follow-ups with something like this decision table:

| Task all done? | Task needs follow-up/breakdown? | Has parent? | Was last child? | Parent done? | System action                 |
| -------------- | ------------------------------- | ----------- | --------------- | ------------ | ----------------------------- |
| Yes            | Yes                             | -           | -               | -            | Enter follow-up as child      |
| Yes            | No                              | Yes         | Yes             | Yes          | Mark task + parent as done    |
| Yes            | No                              | Yes         | Yes             | No           | Ask for next task             |
| Yes            | No                              | Yes         | No              | -            | Mark task as done             |
| Yes            | No                              | No          | -               | -            | Mark task as done             |
| No             | Yes                             | -           | -               | -            | Add next steps as children    |
| No             | No                              | -           | -               | -            | Re-enter task at head of list |

(There may be a few other cases but this is basically it!)

## Timers and Progress

The other thing I've found helpful over the years is setting timers to try and make progress in consistent chunks.
For this reason, this system keeps a count of the completed tasks and sessions.

If it ever becomes a desktop version, I also want it to be able to run scripts to start website blockers or quit apps when I start a session.
