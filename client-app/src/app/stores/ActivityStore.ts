import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore {
  activities = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode: boolean = false;
  loading: boolean = false;
  loadingInitial: boolean = true;

  constructor() {
    makeAutoObservable(this);
    // makeObservable(this, { title: observable, setTitle: action });
  }

  get activitiesByDate() {
    return Array.from(this.activities.values()).sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date)
    );
  }

  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.List();
      activities.forEach((a) => {
        this.setActivity(a);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
    } else {
      this.setLoadingInitial(true);
      try {
        activity = await agent.Activities.Details(id);
        this.setActivity(activity);
        // runInAction(()=>{
        this.selectedActivity = activity;
        //  });

        this.setLoadingInitial(false);
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
    return activity;
  };

  private setActivity = (a: Activity) => {
    a.date = a.date.split("T")[0];
    this.activities.set(a.id, a);
  };

  private getActivity = (id: string) => {
    return this.activities.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  // selectActivity = (id: string) => {
  //   this.selectedActivity = this.activities.get(id);
  // };

  // cancelSelectedActivity = () => {
  //   this.selectedActivity = undefined;
  // };

  // openForm = (id?: string) => {
  //   id ? this.selectActivity(id) : this.cancelSelectedActivity();
  //   this.editMode = true;
  // };

  // closeForm = () => {
  //   this.editMode = false;
  // };

  editOrCreate = async (activity: Activity) => {
    this.loading = true;
    if (activity.id) {
      try {
        await agent.Activities.Update(activity);
        runInAction(() => {
          this.selectedActivity = activity;
          this.activities.set(activity.id, activity);
          this.editMode = false;
          this.loading = false;
        });
      } catch (error) {
        runInAction(() => {
          this.loading = false;
        });
      }
    } else {
      activity.id = uuid();
      try {
        await agent.Activities.Create(activity);
        runInAction(() => {
          this.activities.set(activity.id, activity);
          this.selectedActivity = activity;
          this.editMode = false;
          this.loading = false;
        });
      } catch (error) {}
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.Delete(id);
      runInAction(() => {
        this.activities.delete(id);
        //  = [...this.activities.filter((a) => a.id !== id)];
        // if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
