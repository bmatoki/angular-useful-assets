
I added an example to shared data between component.
there is a lot of options to shared data like input , output , event emitter , subject , behavior subject, replaysubject,async subject.
i decided to upload two options.

```
1) BehaviourSubject will return the initial value or the current value on Subscription
2) Subject doesnot return the current value on Subscription. It triggers only on .next(value) call and return/output the value
```

inside the service you need to create a variable :

```
  // one way for subject
  public loggedDetails = new Subject();

  or

  // other way for behavior subject:
  private loggedDetailsOtherWayData = new BehaviorSubject<LoggedInterface>([]);
  public loggedDetailsOtherWay = this.loggedDetailsOtherWayData.asObservable();


```


and to create a function with next :

```
 // the first way for subject
  public setLoggedDetails(payload) {
    this.loggedDetails.next(payload);
  }

  // the second way  for behavior subject is the same
  setloggedDetailsOtherWayData (payload) {
    this.loggedDetailsOtherWayData.next(payload);
  }


```

When you use next, you fire off an event that all subscribers will listen too.



For Subscribe to the shared data (subject \ behavior etc.. ) inside your component you need to:

```
Create a component, and subscribe to the variable

    this.sharedDataService.loggedDetailsOtherWayData.subscribe((data) => console.log(data);)

    // or:
    this.sharedDataService.loggedDetails.subscribe((data) => console.log(data);)

```

for update the value of the variable from your component you need to call the next function we added inside the service :


```
    this.sharedDataService.setLoggedDetails(this.payload);

    //or:
    this.sharedDataService.setloggedDetailsOtherWayData(this.payload);
```