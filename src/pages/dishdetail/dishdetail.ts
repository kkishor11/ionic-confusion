import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from './../../providers/favorite/favorite';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  dish: Dish;
  errMsg: string;
  avgStars: string;
  numComments: number;
  favorite: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    @Inject('BaseURL') private BaseURL,
    private favoriteService: FavoriteProvider) {
    this.dish = navParams.get('dish');
    this.favorite = this.favoriteService.isFavorite(this.dish.id);
    this.numComments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => {
      total += comment.rating;
    });
    this.avgStars = (total / this.numComments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    this.favorite = this.favoriteService.addFavorite(this.dish.id);
  }

}
