# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...



## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
<<<<<<< HEAD


## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|`index: true`|
|email|string|null: false|

### Association
- has_many :groups, through:  :groups_users
- has_many :messeges
- has_many :groups_users


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through: :groups_users
- has_many :messeges
- has_many :groups_users


## messegesテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|string|null: fasten, foreign_key: true|
|group_id|string|null: faste|
|text|text||
|photo|string||

### Association
- belongs_to :group
- belongs_to :user