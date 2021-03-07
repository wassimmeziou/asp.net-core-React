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
  submitting: boolean = false;

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
    try {
      const activities = await agent.Activities.List();
      activities.forEach((a) => {
        a.date = a.date.split("T")[0];
        this.activities.set(a.id, a);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activities.get(id);
  };

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  setsubmitting = (state: boolean) => {
    this.submitting = state;
  };

  editOrCreate = async (activity: Activity) => {
    //this.setsubmitting(true);
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

      //this.setsubmitting(false);
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
      // this.setsubmitting(false);
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.Delete(id);
      runInAction(() => {
        this.activities.delete(id);
        //  = [...this.activities.filter((a) => a.id !== id)];
        if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
