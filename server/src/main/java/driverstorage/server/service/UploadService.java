package driverstorage.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import driverstorage.server.dto.ResultDto;
import driverstorage.server.dto.UploadDto;
import driverstorage.server.dto.UploadResultDto;
import driverstorage.server.entity.File;
import driverstorage.server.entity.Folder;
import driverstorage.server.mapper.FileMapper;
import driverstorage.server.mapper.FolderMapper;
import driverstorage.server.repository.UploadRepository;

@RestController
public class UploadService {
	private UploadRepository uploadRepository;
	private FileMapper fileMapper;
	private FolderMapper folderMapper;

	@Autowired
	public UploadService(UploadRepository uploadRepository, FileMapper fileMapper, FolderMapper folderMapper) {
		this.uploadRepository = uploadRepository;
		this.fileMapper = fileMapper;
		this.folderMapper = folderMapper;
	}
	
	public UploadResultDto upload(UploadDto uploadDto) {
		Long locationId = uploadDto.getFolderId();
		List<Folder> folders = folderMapper.dtosToEntitys(uploadDto.getFolders());
		List<File> files = fileMapper.dtosToEntitys(uploadDto.getFiles());
		
		Folder saveLocation = uploadRepository.getFolderById(locationId);
		saveLocation.getFolders().addAll(folders);
		saveLocation.getFiles().addAll(files);
		this.uploadRepository.save(saveLocation);
		
		UploadResultDto result = new UploadResultDto();
		ResultDto resultdt = new ResultDto();
		resultdt.setStatusCode((long) 500);
		resultdt.setMessage("all good");
		result.setResult(resultdt);
		result.setRoot(null);
		return result;
	}
}
