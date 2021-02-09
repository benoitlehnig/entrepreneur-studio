export class Project {
	public ownerUid:string="";
	public summary:Summary = new Summary();
	public tags:Array<string>=[];
	public businessCanvas:BusinessCanvas= new BusinessCanvas();
	public domains :Array<any> =[];
	public maturity : string="";
	public team : Team = new Team();
	public teamMembers:Array<TeamMember>=[];
	public financialResources : FinancialResources = new FinancialResources();
	public status : string="active"; 
	public sharingStatus:string="private";
	public theme:Theme;
	public lastUpdateDateTime:Date;
	public creationDateTime:Date;
}

export class Summary {
	public name:string="nouveau projet";
	public websiteUrl:string="";
	public logoUrl:string="";
	public elevatorPitch:string="";
	public socialNetworks:SocialNetworks = new SocialNetworks();
}

export class BusinessCanvas {
	public problem:Array<Item> =[];
	public existingAlternatives:Array<Item>=[];
	public solution:Array<Item>=[];
	public keyMetrics:Array<Item>=[];
	public usp:Array<Item>=[];
	public keyPartners:Array<Item>=[];
	public keyActivities:Array<Item>=[];
	public keyResources:Array<Item>=[];
	public unfairAdvantage:Array<Item>=[];
	public channels:Array<Item>=[];
	public customerSegmentation:Array<Item>=[];
	public earlyAdopters:Array<Item>=[];
	public costStructure:Array<Item>=[];
	public revenueStreams:Array<Item>=[];
}

export class Item {
	public text:string="";
	public details:string="";
}

export class Team{
	public type:string="";
	public profile:string="";	
}
export class FinancialResources{
	public initialFinancialResources:string="";

}
export class Theme{
	public backgroundPictureUrl:string="";
	public backgroundPictureId:string="";

}
export class SocialNetworks{
	public facebook:SocialNeworkData = new SocialNeworkData() ;
	public youtube:SocialNeworkData = new SocialNeworkData() ;
	public twitter:SocialNeworkData = new SocialNeworkData() ;
	public instagram:SocialNeworkData = new SocialNeworkData() ;
	public linkedIn:SocialNeworkData = new SocialNeworkData() ;
}
export class SocialNeworkData{
	public link:string=null
}

export class TeamMember{
	public uid:string;
	public role:string="";
	public projectProfile:string="";
	public status:string="";
	public mission:string="";
	public email:string;
}

export class Resource{
	url:string="";
	name:string="";
	title:string="";
	source:string="";
	pictureUrl:string="";
	order:number=0;
	CMSId:string="";
}

export class TimelineElement {
	id:string="";
	startDate:Date;
	endDate:Date;
	duration:number=0;
	status:string="";
	order:number;
	type:string="";
	stage:string="";
}

export class SkillSearch{
	type:string="";
	creationDate:Date;
	skills:Array<string>=[];
	systemDNotificationRequest:boolean=false;
	freeText:string="";

}

export class Comment{
	createdAt: Date;
	createdBy: string;
	source:string;
	uid:string;
	status: string;
	text: string;
}