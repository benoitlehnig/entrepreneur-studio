import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Project,TimelineElement} from '../models/project';
import {CMSService} from './cms.service';
import { map, switchMap,first,filter } from 'rxjs/operators'
import { Observable, combineLatest, of } from 'rxjs'
import { uniq, flatten } from 'lodash'
import * as moment from 'moment';


@Injectable({
	providedIn: 'root'
})

export class ProjectService {

	projectRef = this.afs.collection<Project>('projects');
	
	constructor(		
		private afs: AngularFirestore,
		private CMSService: CMSService,
		) 
	{ }


	getProjects(){
		return this.afs.collection('projects').snapshotChanges().pipe(map(actions => {
			return actions.map(a => {
				const data = a.payload.doc.data();
				const id = a.payload.doc.id;
				return { id, data };
			});
		}));

	}
	getProjectsIdsbyUid(uid:string,projectId){
		console.log("getProjectsIdsbyUid", uid, projectId)
		return this.afs.collection<any>('users/'+uid+'/projects', ref => ref.where('projectId', '==', projectId)).valueChanges();
	}
	getProjectsDetailsbyUid(uid:string){
		console.log("getProjectsDetailsbyUid", uid)
		return this.afs.collection<any>('users/'+uid+'/projects').snapshotChanges()
		.pipe(
			switchMap(userProjects  => {
				const projectIds = userProjects.map(userProject =>{
					const projectId =userProject.payload.doc.data() as any;
					return projectId;
				}
				)
				console.log("getProjectsDetailsbyUid projectIds", projectIds)
				return combineLatest(
					of(userProjects),
					combineLatest(
						projectIds.map(projectId =>{
							return this.afs.doc<Project>('projects/' +projectId.projectId).valueChanges().pipe(
								map(project => {
									console.log("getProjectsDetailsbyUid project: ",project);
									return {projectId: projectId.projectId, data:project};}  )
								
								)
						})
						) as any,
					)  as any
			}),
			map(([projectIds, projects]) => {
				return projects.map(project  => {
					return {
						...project } 
					}).filter(function(x) {   
						if(x.data !==undefined){return x.data.status !=='deleted'};
					})
				})
			);
	}
	getProjectsbyTeamMemberEmail(email:string){
		return this.afs.collection<Project>('projects', ref => ref.where('teamMembers', 'array-contains', {email: email} )).snapshotChanges().pipe(map(actions => {
			return actions.map(a => {
				const data = a.payload.doc.data() as Project;
				const id = a.payload.doc.id;
				return { id, ...data };
			});
		})
		);
	}

	getProject(id:string){
		return this.afs.doc<Project>('projects/' +id).valueChanges()
	}

	saveProject(id:string,project:Project){
		console.log("Update project >> saveProject", id, project)
		return this.projectRef.doc(id).set(JSON.parse( JSON.stringify(project)));
	}
	addElement(id:string,elementType:string,elementData){
		console.log("Update project >>  addElement", id, elementType,elementData)
		return this.afs.collection('projects').doc(id+'/businessCanvas').collection('problem').add({ name: 'item', price: 10 }).then(
			value=> {return value.id})

	}
	removeProject(id:string){
		console.log("Update project >> removeProject", id)
		return this.afs.collection('projects').doc(id).update({status: "deleted"})
	}
	deleteProject(id:string){
		console.log("delete project >> removeProject", id);
		this.getProjectTeamMembers(id).subscribe(teamMembers =>{
			for(let i = 0;i<teamMembers.length;i++){
				console.log("delete Project teamMembers", id, teamMembers[i]);
				this.removeTeamMember(id, teamMembers[i])
			}
		});
		return this.afs.collection('projects').doc(id).delete();
	}


	getProjectTeamMembers(id){
		return this.afs.collection('projects').doc(id).collection('teamMembers').snapshotChanges().pipe(map(actions => {
			return actions.map(a => {
				const data = a.payload.doc.data();
				const id = a.payload.doc.id;
				return { id, ...data };
			});
		})
		);
	}
	inviteTeamMember(teamMember:any,id:string){
		console.log("Update project >>  inviteTeamMember", id, teamMember);
		return this.afs.collection('projects').doc(id).collection('teamMembers').add( 
			JSON.parse(JSON.stringify(teamMember))  );
	}

	removeTeamMember(projectId, teamMember){
		console.log("Update project >> removeTeamMember", projectId, teamMember);
		if(teamMember.email){
			this.afs.collection('invites').doc(teamMember.email).collection('projectIds').doc(projectId).delete();

		}
		if(teamMember.uid){
			this.afs.collection('users').doc(teamMember.id).collection('projectId').doc(projectId).delete();

		}
		return this.afs.collection('projects').doc(projectId).collection('teamMembers').doc(teamMember.id).delete();

	}
	updateTeamMember(projectId, teamMember){
		console.log("Update project >> updateTeamMember ");
		this.afs.collection('projects').doc(projectId).collection('teamMembers').doc(teamMember.id).update(
			{role: teamMember.role, projectProfile: teamMember.projectProfile, mission : teamMember.mission});
	}

	getResources(id){
		return this.afs.collection('projects').doc(id).collection('resources').snapshotChanges().pipe(map(actions => {
			return actions.map(a => {
				const data = a.payload.doc.data();
				const id = a.payload.doc.id;
				return {id:id, data:data };
			});
		})
		);
	}
	getComments(id){
		return this.afs.collection('projects').doc(id).collection('comments',ref => ref.orderBy('createdAt','asc')).snapshotChanges().pipe(map(actions => {
			return actions.map(a => {
				const data = a.payload.doc.data();
				const id = a.payload.doc.id;
				return {id:id, data:data };
			});
		})
		);

	}
	getCommentsWithUserInfo(id){
		return this.afs.collection('projects').doc(id).collection('comments',ref => ref.orderBy('createdAt','asc')).snapshotChanges()
		.pipe(
			switchMap(comments => {

				const uids = uniq(comments.map(comment => {
					const commentPayload = comment.payload.doc.data();
					if(commentPayload.uid!==undefined && commentPayload.uid!="")
						{ return commentPayload.uid}
				} ))
				let comments_ = comments.map((comment) =>{
					const data = comment.payload.doc.data();
					const id = comment.payload.doc.id;
					return {id:id, data:data };
				});
				return combineLatest(
					of(
						comments_
						),
					combineLatest(
						uids.map(uid =>{
							
							return this.afs.doc('users/'+uid).valueChanges().pipe(
								map(userProfile => {
									console.log("userProfile ",userProfile)
									return {profile: userProfile, uid:uid}})
								)	
							
							
							
						})
						)  as any,
					)  as any
			}),
			map(([comments, userProfiles]) => {
				return comments.map(comment => {
					return {
						...comment,
						userProfile: userProfiles.find((a:any) => a.uid === comment.data.uid)
					}
				})
			})
			)

	}
	addComment(id,comment){
		return this.afs.collection('projects').doc(id).collection('comments').add(comment);
	}
	setCommentStatus(id, commentId,status){
		return this.afs.collection('projects').doc(id).collection('comments').doc(commentId).update({status: status});
	}
	deleteComment(id,commentId){
		return this.afs.collection('projects').doc(id).collection('comments').doc(commentId).delete();
	}
	setSharingStatus(id,status){
		console.log("Update project >> setSharingStatus ");

		return this.afs.collection('projects').doc(id).update({sharingStatus: status});
	}

	addResource(id,resource){
		console.log("Update project >> addResource", id, resource);
		return this.afs.collection('projects').doc(id).collection('resources').add( JSON.parse(JSON.stringify(resource.data)));
	}
	updateResource(id,resource){
		console.log("Update project >> addResource", id, resource);
		//return this.afs.collection('projects').doc(id).collection('resources').doc(resource.id).set( res);
	}
	deleteResource(id,resourceId){
		console.log("Update project >> deleteResource", id, resourceId);
		return this.afs.collection('projects').doc(id).collection('resources').doc(resourceId).delete();
	}

	createDefaultTimeline(id:string){
		console.log("Update project >> createDefaultTimeline");

		return this.CMSService.retrieveTimelineContent().pipe(first()).subscribe(
			data=>{
				return data.forEach(function(timelineElemenCMS){
					console.log("createDefaultTimeline >> ", timelineElemenCMS)
					let timelineElement= new TimelineElement();
					timelineElement.id = timelineElemenCMS.id;
					timelineElement.status="todo";
					timelineElement.startDate= null
					return this.afs.collection('projects').doc(id).collection('timeline').add(JSON.parse(JSON.stringify(timelineElement)));	
				}.bind(this))
			});
	}
	getTimeline(id){
		return this.afs.collection('projects').doc(id).collection('timeline').snapshotChanges()
		.pipe(
			switchMap(timelineElementsData  => {
				const timelineElements = timelineElementsData.map(timelineElement =>{
					const timelineElementReturned = {id:timelineElement.payload.doc.id, data: timelineElement.payload.doc.data() as any};

					return timelineElementReturned;
				}
				)

				return combineLatest(
					of(timelineElements),
					combineLatest(
						timelineElements.map(timelineElement =>{
							return this.afs.doc<Project>('timeline/' +timelineElement.data.id).valueChanges().pipe(
								map(timelineElement2 => {
									return {timelineElementId: timelineElement.data.id, data:timelineElement2};}  )

								)
						})
						) as any,
					)  as any
			}),
			map(([timelineElements, timelineStatic]) => {
				return timelineStatic.map(timelineStatic  => {
					return {
						static:timelineStatic,
						timelineElement: timelineElements.find(a => a.data.id === timelineStatic.timelineElementId)
					}
				})
			})
			);
	}
	saveTimelineElement(id,timelineElement){
		console.log("Update project >> saveTimelineElement");

		return this.afs.collection('projects').doc(id).collection('timeline').doc(timelineElement.timelineElement.id).set(timelineElement.timelineElement.data);

	}

	getSkillSearchers(id){
		return this.afs.collection('projects').doc(id).collection('skillSearches').snapshotChanges()
		.pipe(
			switchMap(skillSearches  => {
				const skillSearchesReturned = skillSearches.map(skillSearch =>{
					const data = skillSearch.payload.doc.data();
					const id = skillSearch.payload.doc.id;
					return {id:id, data:data };;
				}
				)
				return combineLatest(
					of(skillSearchesReturned),
					combineLatest(
						skillSearchesReturned.map((skillSearch:any) =>{
							return  this.afs.collection('projects').doc(id).collection('skillSearches').doc(skillSearch.id).collection('responses').snapshotChanges().pipe(
								map(responses => {
									return responses.map( response =>{
										const responseData = response.payload.doc.data();
										const responseId = response.payload.doc.id;
										return {skillSearchId:skillSearch.id, responseId: responseId, data:responseData};}  )
								})


								)
						})
						) as any,
					)  as any
			}),
			map(([skillSearches, responses]) => {
				return skillSearches.map(skillSearch  => {
					return {
						...skillSearch, 
						responses: responses.find(a => {
							if(a.length>0){
								return a[0].skillSearchId === skillSearch.id
							}
							else {
								return false
							}
						})} 
					})
			})
			);
	}

	saveSkillSearch(id,skillSearch){
		skillSearch.creationDate = moment().format();
		console.log("Update project >> saveSkillSearch", id, skillSearch);
		return this.afs.collection('projects').doc(id).collection('skillSearches').add(JSON.parse( JSON.stringify(skillSearch)));
	}
	deleteSkillSearch(projectId,skillSearchId){
		return this.afs.collection('projects').doc(projectId).collection('skillSearches').doc(skillSearchId).delete();
	}

	getGoogleDriveSettings(projectId){
		return this.afs.collection('installations/drive/'+projectId).doc("settings").valueChanges()
	}

}
