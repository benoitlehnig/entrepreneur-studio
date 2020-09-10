export class User {
	role:string="entrepreneur";
	onBoardingDone:boolean=false;
	projects:string[];
	profile:Profile = new Profile();
	firstName:string="";
	lastName:string="";
	email:string="";
	displayName:string="";
}

export class Profile{
	currentSituation:string="";
	experience:string="";
	personalMotivation:string="";
}