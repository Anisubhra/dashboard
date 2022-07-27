import { formatDate } from '@angular/common';
import { Injectable, PipeTransform } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  user_stats;
  routerEvent;

  constructor(private authService: AuthService, private router: Router) {
    this.user_stats = localStorage.getItem('user_stats');
  }

  get analytics() {
    const stats = this.user_stats ? JSON.parse(this.user_stats) : [];
    return stats;
  }

  startTracker() {
    const role = this.authService.loggedInUser.role;

    if (role == 'member')
      this.routerEvent = this.router.events.subscribe(event => {
        // if logged out stop tracking
        if (!this.authService.loggedInUser) {
          this.routerEvent.unsubscribe();
          return;
        }
        // else keep tracking
        if (event instanceof NavigationStart) {
          this.trackAnalytics(event.url)
        }
      })
  }

  trackAnalytics(page) {
    const user = this.authService.loggedInUser;
    const newStats = {
      user: user.name,
      total: 0,
      page,
      time: formatDate(
        new Date(),
        'dd-MM-yyyy hh:mm:ss a',
        'en-US'
      )
    }
    let userStats;

    if (this.user_stats) {
      userStats = JSON.parse(this.user_stats);
      const totalPages = userStats.filter(item => user.name == item.user && item.page == page).map(item => item.page);
      const totalPagesCount = totalPages.length + 1;

      userStats.push({ ...newStats, total: totalPagesCount });
    }
    else {
      userStats = [{ ...newStats, total: 1 }];
    }

    console.log(userStats);
    userStats = JSON.stringify(userStats);
    this.user_stats = userStats;
    localStorage.setItem('user_stats', userStats);
  }
}
