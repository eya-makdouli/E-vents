package com.datmt.keycloak.springbootauth.Repository;

import com.datmt.keycloak.springbootauth.Model.Notifications;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationsRepository extends JpaRepository<Notifications, Long> {
    Optional<Notifications> findNotificationsByUser_Id (String id);
    Optional<Notifications> findNotificationsByEvent_Id (Long id);
    Optional<Notifications> findNotificationsByUser_IdAndEvent_IdAndSolvedAndType(String id , Long idEvent, Boolean solved, String type);
    List<Notifications> findAllByUser_Id(String id);
    List<Notifications> findAllByOrg_Id(String id);
    Optional<Notifications> findNotificationsByUser_IdAndEvent_IdAndAcceptedAndType(String id , Long Event, Boolean accepted, String type);
    Integer countNotificationsByUser_IdAndEvent_IdAndOrg_Id(String id , Long Event , String orgId);
    List<Notifications> findAllByOrg_idAndEvent_IdAndSolvedAndType(String id , Long idEvent, Boolean solved, String type);
    List<Notifications> findAllByUser_IdAndAcceptedAndType(String id, Boolean accepted , String type);
    List<Notifications> findAllByEvent_IdAndAccepted(Long id, Boolean accepted);
    List<Notifications> findAllByOrg_idAndAcceptedAndType(String id , Boolean accepted , String type);
}
