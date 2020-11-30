import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Project} from '../models/project';
import { map, switchMap,first,filter } from 'rxjs/operators'
import { Observable, combineLatest, of } from 'rxjs'
import { uniq, flatten } from 'lodash'

@Injectable({
	providedIn: 'root'
})

export class ProjectService {

	projectRef = this.afs.collection<Project>('projects');
	
	constructor(		
		private afs: AngularFirestore) 
	{ }


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
		console.log("saveProject", id, project)
		return this.projectRef.doc(id).set(JSON.parse( JSON.stringify(project)));
	}
	addElement(id:string,elementType:string,elementData){
		console.log("addElement", id, elementType,elementData)
		return this.afs.collection('projects').doc(id+'/businessCanvas').collection('problem').add({ name: 'item', price: 10 }).then(
			value=> {return value.id})

	}
	removeProject(id:string){
		console.log("removeProject", id)
		return this.afs.collection('projects').doc(id).update({status: "deleted"})
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
		console.log("inviteTeamMember", id, teamMember);
		return this.afs.collection('projects').doc(id).collection('teamMembers').add( 
			JSON.parse(JSON.stringify(teamMember))  );
	}

	removeTeamMember(projectId, teamMember){
		console.log("removeTeamMember", projectId, teamMember);
		if(teamMember.email){
			this.afs.collection('invites').doc(teamMember.email).collection('projectIds').doc(projectId).delete();

		}
		if(teamMember.uid){
			this.afs.collection('users').doc(teamMember.id).collection('projectId').doc(projectId).delete();

		}
		return this.afs.collection('projects').doc(projectId).collection('teamMembers').doc(teamMember.id).delete();

	}
	updateTeamMember(projectId, teamMember){
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
	saveResource(id,resources){
		console.log("saveResource", id, resources);
		return this.afs.collection('projects').doc(id).collection('resources').add(resources);

	}
	addResource(id,resource){
		console.log("addResource", id, resource);
		return this.afs.collection('projects').doc(id).collection('resources').add( JSON.parse(JSON.stringify(resource.data)));
	}
	updateResource(id,resource){
		console.log("addResource", id, resource);
		//return this.afs.collection('projects').doc(id).collection('resources').doc(resource.id).set( res);
	}
	deleteResource(id,resourceId){
		console.log("deleteResource", id, resourceId);
		return this.afs.collection('projects').doc(id).collection('resources').doc(resourceId).delete();
	}

}
