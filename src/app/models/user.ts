export class User {
	role:string="entrepreneur";
	onBoardingDone:boolean=false;
	profile:Profile = new Profile();
	firstName:string="";
	lastName:string="";
	email:string="";
	displayName:string="";
	photoUrl:string="";
	projects;
	linkedInUrl:string="";
	conseilCMSID:string;
}

export class Profile{
	currentSituation:string="";
	experience:string="";
	personalMotivation:string="";
}